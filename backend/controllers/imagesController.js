const debug = require('debug')('blogApi:imagesController')
const fs = require('fs')

exports.image_upload_post = (req, res) => {
    const image = req.file.path
    debug('image', image)

    res.json({
        message: `path:${image}`,
        success: true
    })
    
}