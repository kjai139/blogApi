const debug = require('debug')('blogApi:commentsController')
const Comment = require('../models/commentModel')

exports.comment_post = async (req, res) => {
    try {

        const userId = req.user.id
        const delta = req.body.comment
        const postId = req.body.postId

        const newComment = new Comment({
            author: userId,
            body: delta,
            postId: postId
        })

        await newComment.save()

        res.json({
            message: 'Comment posted'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

exports.comments_get = async (req, res) => {
    try {
        const postId = req.query.id
        const comments = await Comment.find({ postId: postId })

        res.json({
            comments: comments
        })

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}