const express = require('express')
const router = express.Router()

const userController = require('../controllers/usersController')

router.post('/create', userController.create_user_post)

router.get('/check', userController.users_create_check)

router.get('/get', userController.users_login_get)

router.post('/login', userController.users_login_post)

router.delete('/logout', userController.user_logout_post)

module.exports = router