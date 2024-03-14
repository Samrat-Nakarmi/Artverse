const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;