const debug = require('debug')('blogApi:imagesController')
const fs = require('fs')
const crypto = require('crypto')

require('dotenv').config()

const {PutObjectCommand, S3Client, DeleteObjectCommand} = require('@aws-sdk/client-s3')

const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET
    }
})

const generateRandomString = (len) => {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len)
}

const generateTimeStamp = () => {
    return Date.now()
}

exports.image_upload_post = async (req, res) => {
    const image = req.file.path
    const filename = req.body.filename
    debug('image', image)
    const bucketname = 'kjblogapiodin'
    const s3KeyName = `${generateRandomString(5)}_${generateTimeStamp()}${filename}`

    debug('s3keyname', s3KeyName)
    

    const params = {
        Bucket: bucketname,
        Key: `images/temp/${s3KeyName}`,
        Body: fs.createReadStream(req.file.path),
        ACL: 'public-read',
        ContentType: 'image/x-icon'
    }

    try {
        

        const command = new PutObjectCommand(params)
        const response = await s3Client.send(command)

        
        res.json({
            message: `upload to s3 successful, url: https://${bucketname}.s3.us-east-2.amazonaws.com/${params.Key} ${response}`,
            url:`https://${bucketname}.s3.us-east-2.amazonaws.com/${params.Key}`,
            success: true
        })

        fs.unlink(req.file.path, (err) => {
            if (err){
                debug('error deleting file')
            } else {
                debug('file deleted successfully')
            }
        })


    }catch(err) {
        debug(err)
    }

    
    
}