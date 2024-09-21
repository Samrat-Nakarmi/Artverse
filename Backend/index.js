const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Wrap the connection in an async function to handle errors properly
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/artverse");
    console.log("DB Connected...");
  } catch (error) {
    console.error("DB Connection Unsuccessful \n", error);
  }
};
connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parsing the urlencoded data
app.use(bodyParser.text({ type: "/" }));

const userRoute = require("./routes/user");
const artRoute = require("./routes/art");
const loginRoute = require("./routes/auth");
const marketRoute = require("./routes/product");

app.use("/", loginRoute);
app.use("/register", userRoute); // Use a base path for the user routes
app.use("/dashboard", artRoute);
app.use("/market", marketRoute);

app.use("/public/uploads", express.static("./public/uploads"));

app.get("/", (req, res) => {
  return res.status(200).json({ Artverse: { state: true } });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
