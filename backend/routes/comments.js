const express = require('express')
const isAuthenticated = require('../middleware/authentication')
const router = express.Router()
const commentController = require('../controllers/commentsController')

router.post('/post', isAuthenticated, commentController.comment_post)


router.get('/get', commentController.comments_get)

module.exports = router