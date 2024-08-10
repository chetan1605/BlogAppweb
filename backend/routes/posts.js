const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Comment = require("../models/Comments")
const Posts = require("../models/Posts")
const verifyToken = require('../verifyToken')

router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newPost = new Posts(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.put("/:id",verifyToken,async (req,res)=>{
    try{
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost) 

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Posts.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post deleted successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const post = await Posts.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async (req,res)=>{
    const query = req.query
    try{
        const searchFilter = {
            title:{$regex:query.search,$options:"i"}
        }
       const post = await Posts.find(query.search?searchFilter:null)
       res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.get("/user/:userId",async (req,res)=>{
    try{
       const post = await Posts.find({userId:req.params.userId})
       res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router