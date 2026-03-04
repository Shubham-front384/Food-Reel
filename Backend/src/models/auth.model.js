const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required."]
  },
  email: {
    type: String,
    unique: [true, "Email should be unique."],
    required: [true, "Email is required."]
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
  }
}, { timestamps: true });

const authModel = mongoose.model("users", authSchema);

module.exports = authModel;
