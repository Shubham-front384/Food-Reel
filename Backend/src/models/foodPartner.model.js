const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required."]
  },
  contactName: {
    type: String,
    required: [true, "Contact name is required."]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required."]
  },
  address: {
    type: String,
    required: [true, "Address is required."]
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

const foodPartnerModel = mongoose.model("food-partner", foodPartnerSchema);

module.exports = foodPartnerModel;
