const express = require('express')
const router = express.Router()
const User = require('../model/User')
const mongoose = require('mongoose')
const {get_hash, compare_password} = require('../utils/AuthUtil')

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password, email)
    try {
      const user = new User({ username, password : await get_hash(password), email });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error registering user');
    }
});

module.exports = router