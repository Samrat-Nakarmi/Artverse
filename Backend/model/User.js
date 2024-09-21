const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  arts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
  liked_arts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  date_created: Date,
  last_logged_in: Date,
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
