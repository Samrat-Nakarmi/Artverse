const mongoose = require('mongoose')

const {Schema, model} = mongoose

const ImageSchema = new Schema({
    image_link:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 450
    },
    posted_by:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    date_uploaded: Date

})

const ImageModel = model("Image", ImageSchema)
module.exports = ImageModel