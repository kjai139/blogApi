const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        
        
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
        type:Schema.Types.Mixed,
        required:true
    },
    published: {
        type:Boolean,
        default: false
    },
    publishDate: {
        type:Date,
        default:null
    },
    draft: {
        type:Boolean,
        default:true
    }
})

BlogPostSchema.index({
    postTitle: 1
}, {
    unique:true,
    collation: {locale: 'en', strength: 1}
})


module.exports = mongoose.model('BlogPost', BlogPostSchema)