const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer token
    if(!authorization){
        console.log("kaali hai")
       return res.status(401).json({error:"you must be login in"})
    }
  const token = authorization.replace("Bearer ","")
  
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err)
            return res.status(401).json({error:"you must be login in"})
     
        }
        const {_id} = payload
        User.findOne(_id).then(userdata=>{
            req.user = userdata
        })
        next()
    })
}