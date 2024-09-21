const mongoose = require("mongoose");
const{Schema, model} = mongoose

const uploadSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    hashtags: {
      type: String,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const ArtModel = model("Art", uploadSchema)
module.exports = ArtModel