const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const Posts = require("../models/Posts")
const Comment = require("../models/Comments")
const verifyToken = require('../verifyToken')


router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newPost  = new Posts(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id",verifyToken,async (req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password= await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser) 

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User successfully deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/:id",async (req,res)=>{
    try{
       const user = await User.findById(req.params.id)
       const {password,...info}=user._doc
       res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router