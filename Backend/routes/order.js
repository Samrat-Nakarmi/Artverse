const { Router } = require("express");
// const uploadArt = require("../utils/ArtUtil");
const Product = require("../model/Product");
const User = require("../model/User");
const { authenticateToken } = require("../utils/JwtUtil");

const router = Router();



router.post('/checkout', authenticateToken, async(req, res) => {
    const product_id = req.body.product;
    
} );

module.exports = router;
