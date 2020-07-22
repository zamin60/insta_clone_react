const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require('../keys')
const requireLogin = require('../middleware/requireLogin')

const router = express.Router()

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exits with email" })
            }
            bcrypt.hash(password,12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved sucessfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email| !password){
        res.status(422).json( {error:"please provide email and password"})

    }
    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or pasword"})
        
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
             //   res.json({meassage:"sucessfully signedin"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or pasword"})
            
            }
        })
    })
    .catch(err=>{console.log(err)})
})
module.exports = router