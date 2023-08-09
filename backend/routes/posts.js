const express = require('express')
const isAuthenticated = require('../middleware/authentication')
const router = express.Router()

const blogPostController = require('../controllers/blogPostController')


router.post('/create', isAuthenticated, blogPostController.create_blogPost_post)

router.get('/get', isAuthenticated, blogPostController.get_blogPost_get)

router.post('/publish', isAuthenticated, blogPostController.publishPost_post)

router.delete('/delete', isAuthenticated, blogPostController.blogPost_delete)

router.get('/home/get', blogPostController.homepage_blogPost_get)

router.get('/detail/get', blogPostController.blogPost_details_get)

module.exports = router