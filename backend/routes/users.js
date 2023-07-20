const express = require('express')
const router = express.Router()

const userController = require('../controllers/usersController')

router.post('/create', userController.create_user_post)

router.get('/check', userController.users_create_check)

module.exports = router