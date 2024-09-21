// const mongoose = require("mongoose")
// const path = require('path')


// function validate_extension(filename){
//     const allowed = [".png",".jpg",".jpeg",".JPG",".gif"]
//     // console.log(filename.name)
//     if (!allowed.includes(path.extname(filename.name))){
//         console.log(path.extname(filename.name))
//         return false
//     }
//     return true
// }

// function validate_event_request(req){
//     if(!req.files){
//         return false
//     }
//     console.log(req.body.title, req.body.register_link, req.body.description, req.body.event_date, req.files.event_image)
//     if(!req.body.title || !req.body.register_link || !req.body.description || !req.body.event_date || !req.files.event_image){
//         console.log("failed what?")
//         return false
//     }
//     if(!validate_extension(req.files.event_image)){
//         console.log(validate_extension(req.files.event_image))
//         return false
//     }
//     return true
// }