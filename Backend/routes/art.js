const { Router } = require("express");
const uploadArt = require("../utils/ArtUtil");
const Art = require("../model/Art");
const User = require("../model/User");
const { authenticateToken } = require("../utils/JwtUtil");
const Product = require("../model/Product");

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const allPhotos = await Art.find()
      .populate("user")
      .sort({ createdAt: "descending" });
    res.send({ allPhotos: allPhotos, user: res.locals.user });
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:artid", async (req, res) => {
  // returns article matching that uuid or 404 also add views data and log EVERYTHING
  console.log(req.params.artid);
  const individual_article_data = await Art.findById(req.params.artid).populate(
    "user"
  );
  if (individual_article_data == null) {
    return res.status(404).json({});
  }

  return res.status(200).json(individual_article_data);
});

// router.get("/me", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(res.locals.user);
//     console.log("waaaaaaaaaaaaaaaa");
//     console.log(user)
//     res.send(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error });
//   }
// });

router.delete("/user/art/:artId", authenticateToken, async (req, res) => {
  const artId = req.params.artId;
  console.log(artId);

  const art = await Art.findByIdAndDelete(artId);
  res.status(200).json({ art });
});
router.delete(
  "/user/product/:productId",
  authenticateToken,
  async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);

    const product = await Art.findByIdAndDelete(productId);
    res.status(200).json({ product });
  }
);

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("UserId", userId);
  try {
    // Fetch user details
    const user = await User.findById(userId);

    // Fetch arts by the user
    const userArts = await Art.find({ user: userId });

    // Fetch products by the user
    const userProducts = await Product.find({ user: userId });

    res.json({
      user,
      arts: userArts,
      products: userProducts,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/upload",
  authenticateToken,
  uploadArt.single("photo"),
  async (req, res) => {
    console.log("yohohoho");
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("User: ", res.locals.user);
    const photo = req.file.filename;
    const createdPhoto = await Art.create({
      photo: photo,
      title: req.body.title,
      hashtags: req.body.hashtag,
      user: res.locals.user._id,
    });

    const user = await User.findByIdAndUpdate(
      res.locals.user._id,
      { $push: { arts: createdPhoto._id } },
      { new: true }
    );
    console.log("Uploaded Successfully:", createdPhoto);
    console.log("New User: ", user);
    res.status(200).json(createdPhoto);
  }
);

router.post("/like", authenticateToken, async (req, res) => {
  const userId = res.locals.user._id;
  const artId = req.body.id;
  console.log("art: ", req.body);
  console.log("User: ", userId);

  try {
    // Find the art piece by its ID
    const art = await Art.findById(artId);

    if (!art) {
      return res.status(404).json({ error: "Art not found" });
    }

    // Check if the user already likes the art
    const userLiked = art.likes.includes(userId);

    // Toggle the like for the current user
    if (userLiked) {
      // User already likes the art, so remove the like
      art.likes.pull(userId);
    } else {
      // User does not like the art, so add the like
      art.likes.push(userId);
    }

    // Save the updated art document
    await art.save();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the liked_arts field of the user
    if (userLiked) {
      // Remove the art ID from liked_arts if already liked
      user.liked_arts.pull(artId);
    } else {
      // Add the art ID to liked_arts if not already liked
      user.liked_arts.push(artId);
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Like toggled successfully" });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/liked-arts", authenticateToken, async (req, res) => {
  console.log("hello");
  try {
    const userId = res.locals.user._id;
    console.log("USER: ", userId);
    const user = await User.findById(userId).populate("liked_arts");
    if (!user) {
      return res.status(404).json({ error: "Userr not found" });
    }
    return res.json(user.liked_arts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
