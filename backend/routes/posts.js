const express = require('express')
const isAuthenticated = require('../middleware/authentication')
const router = express.Router()

const blogPostController = require('../controllers/blogPostController')


router.post('/create', isAuthenticated, blogPostController.create_blogPost_post)

router.get('/get', isAuthenticated, blogPostController.get_blogPost_get)



module.exports = router