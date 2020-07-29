const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router()
const Post  = mongoose.model("Post")
const User = mongoose.model("user")


router.get('/user/:id',(re,res)=>{
    User.findOne({_id:requireLogin.param.id})
    .select("-password")
    .then(user=>{
            Post.find({postedBy:requireLogin.param.id})
            .populate("postedBy","_id name")
            .exec((err,posts)=>{
                if(err){
                    return res.status(422).json({error:err})
                }
                res.json({user,posts})
            })
    }).catch(err=>{
        return res.status(404).json({error:"user not found"})
    })
})













module.exports=router