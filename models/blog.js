const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true})

// Schema defines the structure of document
// Model surrounds schema and provides us with interface to commuincate with database collection for that datatype

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;