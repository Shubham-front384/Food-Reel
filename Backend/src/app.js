const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));

// Router require
const authRouter = require("./routes/auth.route");
const foodRouter = require("./routes/food.route");

// Router use
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = app;
