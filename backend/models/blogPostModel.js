const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    postTitle: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    body: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)