const express = require("express");
const router = express.Router();
const User = require("../model/User");
const mongoose = require("mongoose");
const { get_hash, compare_password } = require("../utils/AuthUtil");

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
  try {
    const user = new User({
      username,
      password: await get_hash(password),
      email,
      date_created: new Date(),
      last_logged_in: null,
    });
    await user.save();
    return res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

module.exports = router;
