const { body, validationResult} = require('express-validator')
const BlogPost = require('../models/blogPostModel')

const debug = require('debug')('blogApi:blogPostController')



exports.get_blogPost_get = async (req, res) => {
    debug(req.query.id)
    try {
        const posts = await BlogPost.find({author: req.query.id})

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

                const newPost = new BlogPost({
                    postTitle: postTitle,
                    author: authorId,
                    body: delta,

                })

                await newPost.save()

                res.json({
                    message:`Post created`,
                    success:true,
                    
                })
            } catch (err) {
                debug(err.code)
                if (err.code === 11000) {
                    res.status(500).json({
                        message: 'A post with the same title already exists'
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