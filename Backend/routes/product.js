const { Router } = require("express");
const uploadArt = require("../utils/ArtUtil");
const Product = require("../model/Product");
const Order = require("../model/Order");
const User = require("../model/User");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { authenticateToken } = require("../utils/JwtUtil");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate("user")
      .sort({ createdAt: "descending" });
    res.send(allProducts);
  } catch (error) {
    console.log("Error Getting Products: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  console.log("yohohoho");

  console.log("User: ", res.locals.user);
  console.log("Body: ", req.body);
  const createdOrder = await Order.create({
    products: req.body.product,
    user: res.locals.user._id,
    status: req.body.status,
  });

  const user = await User.findByIdAndUpdate(
    res.locals.user._id,
    { $push: { orders: createdOrder._id } },
    { new: true }
  );

  const product_id = req.body.product;
  const product = await Product.findById(product_id);

  const line_items = [];
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "USD",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: user.email,
    success_url: "http://localhost:3000/market/success",
    cancel_url: "http://localhost:3000/market",
  });

  console.log("Uploaded Successfully:", createdOrder);
  console.log("New User: ", user);

  res.status(200).json({ order: createdOrder, url: session.url });
});

router.post(
  "/upload",
  authenticateToken,
  uploadArt.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const photo = req.file.filename;
    const createdProduct = await Product.create({
      name: req.body.name,
      photo: photo,
      price: req.body.price,
      user: res.locals.user._id,
    });

    const user = await User.findByIdAndUpdate(
      res.locals.user._id,
      { $push: { products: createdProduct._id } },
      { new: true }
    );
    console.log("Uploaded Successfully:", createdProduct);
    res.status(200).json(createdProduct);
  }
);

module.exports = router;
