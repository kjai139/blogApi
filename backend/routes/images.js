const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const ImageController = require('../controllers/imagesController')

router.post('/upload', upload.single('image'), ImageController.image_upload_post)

module.exports = router