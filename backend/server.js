const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const usersRouter = require('./routes/users')

require('dotenv').config()
const app = express()
const port = process.env.PORT || 4000
const mongodb = process.env.MONGO_LOGIN
const allowedOrigins = ['http://localhost:3000']

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
    origin: allowedOrigins
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/users', usersRouter)

app.listen(port, '::', () => {
    console.log(`server running on port ${port}!`)
})