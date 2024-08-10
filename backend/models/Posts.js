const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model("Posts",PostsSchema)