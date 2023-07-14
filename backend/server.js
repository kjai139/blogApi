const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 4000
const mongodb = process.env.MONGO_LOGIN

const main = async () => {
    try {
        await mongoose.connect(mongodb)
        console.log('mongodb logged in successfully')
    } catch (err) {
        console.log(err)
    }
}

main()

app.listen(port, '::', () => {
    console.log(`server running on port ${port}!`)
})