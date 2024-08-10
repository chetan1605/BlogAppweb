const mongoose = require("mongoose")

const CommentsSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Comments",CommentsSchema)