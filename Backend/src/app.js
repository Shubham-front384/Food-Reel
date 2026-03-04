const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Router require
const authRouter = require("./routes/auth.route");
const foodRouter = require("./routes/food.route");

// Router use
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);

module.exports = app;
