const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const usersRouter = require('./routes/users')
const imagesRouter = require('./routes/images')
const blogPostRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000
const mongodb = process.env.MONGO_LOGIN
const allowedOrigins = ['http://localhost:3000', 'https://blog-api-gilt-ten.vercel.app']

const main = async () => {
    try {
        await mongoose.connect(mongodb)
        console.log('mongodb logged in successfully')
    } catch (err) {
        console.log(err)
    }
}



main()

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))



app.use('/users', usersRouter)
app.use('/images', imagesRouter)
app.use('/posts', blogPostRouter)
app.use('/comments', commentsRouter)

app.listen(port, '::', () => {
    console.log(`server running on port ${port}!`)
})