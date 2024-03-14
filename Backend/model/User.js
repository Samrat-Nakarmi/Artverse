const mongoose = require("mongoose")

const {Schema, model} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    },
    followers: [{ 
        type: Schema.Types.ObjectId, ref: 'User' 
    }], // Users who follow this user
    following: [{ 
        type: Schema.Types.ObjectId, ref: 'User' 
    }],
    date_created: Date
})

const UserModel = model("User", UserSchema)
module.exports = UserModel