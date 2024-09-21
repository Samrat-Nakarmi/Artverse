const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    products: {
      type: String,
    },
    status: {
      type: String,
      default: "Delivered",
      enum: ["Pending", "Delivered"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model("Order", orderSchema);
module.exports = OrderModel;
