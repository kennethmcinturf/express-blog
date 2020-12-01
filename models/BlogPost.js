const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Post must have a title']
    },
    body:  {
        type: String,
        required: [true, 'Post must have text in body']
    },
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image:String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;