const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
// const upload = multer({dest: 'uploads/'})
const upload = multer({storage: storage})

const ImageController = require('../controllers/imagesController')

router.post('/upload', upload.single('image'), ImageController.image_upload_post)

module.exports = router