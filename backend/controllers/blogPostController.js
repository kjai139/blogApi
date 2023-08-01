const { body, validationResult} = require('express-validator')
const BlogPost = require('../models/blogPostModel')

const debug = require('debug')('blogApi:blogPostController')

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

                res.json({
                    message:`received post title ${postTitle}`,
                    success:true,
                    delta: delta,
                    user: req.user
                })
            } catch (err) {
                res.status(500).json({
                    message: err
                })
            }
            
        }
    }
]