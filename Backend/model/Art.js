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
    }
  },
  { timestamps: true }
);

const ArtModel = model("Art", uploadSchema)
module.exports = ArtModel