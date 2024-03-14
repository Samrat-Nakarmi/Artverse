const express = require('express')
const router = express.Router()
const User = require('../model/User')
const mongoose = require('mongoose')
const {get_hash, compare_password} = require('../utils/AuthUtil')


router.post('/', async(req, res) => {
    if(!req.body.password || !req.body.email) {
        return res.status(400).json({error: "Username, Password and Email required"})
    }

    console.log(req.body.password, req.body.email)

    let in_data = await User.findOne({"email": req.body.email})

    if(!in_data){
        return res.status(404).json({error:"No such username"})
    }

    let verified = await compare_password(req.body.password,in_data.password)

    if(!verified){
        return res.status(401).json({error:"Incorrect Credentials."})
    }

    return res.status(200).json({"detail":"Success"})
})

router.get('/logout',(req,res)=>{
    res.status(200).json("Frontend plz destroy jwt session")
})

module.exports = router