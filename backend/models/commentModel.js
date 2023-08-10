const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true

    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    body: {
        type:Schema.Types.Mixed,
        required: true
    }
})

module.exports = mongoose.model('Comment', CommentSchema)