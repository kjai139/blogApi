const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type:String,
        required: true,

    },
    password: {
        type:String,
        required:true
    },
    user_status: {
        type:String,
        enum:['admin', 'user'],
        default: 'user'
    },
    admin_password: {
        type:String,
        default: 'secretnumber3'
    }

})

module.exports = mongoose.model('User', UserSchema)