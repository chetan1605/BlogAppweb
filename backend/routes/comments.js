const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Posts = require("../models/Posts")
const Comments = require("../models/Comments")
const verifyToken = require('../verifyToken')

router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newComment = new Comments(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.put("/:id",verifyToken,async (req,res)=>{
    try{
        const updatedComment = await Comments.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment) 

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment deleted successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/post/:postId",async (req,res)=>{
    try{
       const comments = await Comments.find({postId:req.params.postId})
       res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router