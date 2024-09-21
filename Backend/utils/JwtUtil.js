const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

function generateAccessToken(user_obj) {
  return jwt.sign({ sub: user_obj.id }, process.env.JWT_TOKEN, {
    expiresIn: "4d",
  });
}

async function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (token == null)
    return res.status(401).send({ error: "Authorization Token Missing!" });

  const user_id = decoded.sub;

  const user = await User.findById({ _id: user_id });
  if (user == null) {
    return res.status(401).json({ error: "User not found" });
  }
  res.locals.user = user;
  next();
}

module.exports = { generateAccessToken, authenticateToken };
