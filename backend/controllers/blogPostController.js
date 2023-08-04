const { body, validationResult} = require('express-validator')
const BlogPost = require('../models/blogPostModel')

const debug = require('debug')('blogApi:blogPostController')

require('dotenv').config()
const {PutObjectCommand, S3Client, DeleteObjectCommand, CopyObjectCommand} = require('@aws-sdk/client-s3')

const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET
    }
})

exports.get_blogPost_get = async (req, res) => {
    debug(req.query.id)
    try {
        const posts = await BlogPost.find({author: req.query.id}).populate('author').sort({createdAt: -1})

        res.json({
            message: `received id ${req.query.id}`,
            blogPosts: posts
        })
    }catch (err) {
        res.json({
            message: err
        })
    }
    
}


exports.create_blogPost_post = [
    body('postTitle').trim()
    .isLength({min: 1})
    .escape(),

    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            })
        } else {

            try {
                const postTitle = req.body.postTitle
                const delta = req.body.delta
                const authorId = req.user.id

                const updatedDelta = { ...delta}
                for (const op of updatedDelta.ops) {
                    if (op.insert.image) {
                        const imageUrl = op.insert.image
                        debug(`image:${imageUrl}`)
                        const bucketname = 'kjblogapiodin'
                        const urlParts = imageUrl.split('/')
                        const filename = urlParts[urlParts.length -1]

                        debug(filename)
                        const copyParams = {
                            Bucket: bucketname,
                            CopySource: `${bucketname}/images/temp/${filename}`,
                            Key: `images/perm/${filename}`,
                            ACL: 'public-read',
                            ContentType: 'image/x-icon'
                            
                        }

                        const copyCommand = new CopyObjectCommand(copyParams)

                        const response = await s3Client.send(copyCommand)
                        debug('Object metadata updated', response)

                        op.insert.image = `https://${bucketname}.s3.us-east-2.amazonaws.com/${copyParams.Key}`

                        debug('new url:', op.insert.image)

                    }
                }

                const newPost = new BlogPost({
                    postTitle: postTitle,
                    author: authorId,
                    body: updatedDelta,

                })

                await newPost.save()

                

                res.json({
                    message:`Post created`,
                    success:true,
                    
                    
                })
            } catch (err) {
                debug(err.code)
                debug(err)
                debug(err.message)
                if (err.code === 11000) {
                    res.status(500).json({
                        message: 'A post with the same title already exists',
                        code: 11000
                    })
                } else {
                    res.status(500).json({
                        message: err
                    })
                }
                
            }
            
        }
    }
]

exports.publishPost_post = async (req, res) => {
    try {
        const id = req.body.id

        const updatedPost = {
            published: true,
            publishDate: Date.now()

        }

        const response = await BlogPost.findByIdAndUpdate(id, updatedPost)

        res.json({
            message: `Post published`
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.blogPost_delete = async (req, res) => {
    const deleteS3Images = async (delta) => {
        debug(delta)
        for (const op of delta.ops) {
            debug('op', op)
            if (op.insert.image) {
                debug('image url for deletion:', op.insert.image)
                const imageUrl = op.insert.image
                const urlParts = imageUrl.split('/')
                const filename = urlParts[urlParts.length -1]
                const deleteParams = {
                    Bucket: 'kjblogapiodin',
                    Key: `images/perm/${filename}`
                }
                const deleteCommand = new DeleteObjectCommand(deleteParams)
                await s3Client.send(deleteCommand)
                debug(`${filename} deleted`)
            }
            
        }
    }
    try {
        const id = req.query.id
        const post = await BlogPost.findById(id)

        await deleteS3Images(post.body)
        
        await post.deleteOne()


       
        res.json({
            message: 'Post deleted'
        })

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}