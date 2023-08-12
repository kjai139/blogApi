const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    body: {
        type:Schema.Types.Mixed,
        required: true
    },
    postId: {
        required: true,
        type:Schema.Types.ObjectId,
        ref: 'BlogPost'
    }
})

module.exports = mongoose.model('Comment', CommentSchema)