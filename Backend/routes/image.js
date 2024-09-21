// const express = require('express')
// const router = express.Router()
// const User = require('../model/User')
// const Image = require('../model/Image')

// router.get('/', async(req, res) => {
//     const all_images = await Image.find()
//     return res.status(200).json({"images": all_images})
// })

// router.get('/:imageId', async(req, res) =>{
//     if(!mongoose.Types.ObjectId.isValid(req.params.imageId)){
//         return res.status(401).json({"error": "Not a valid ID"})
//     }
//     const data = await Image.findById(req.params.imageId)
//     if(!data){
//         return res.status(404).json({})
//     }
//     return res.status(200).json(data)
// })

// router.post('/', async(req, res)=>{
    
// })