const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."]
  },
  video: {
    type: String,
    required: [true, "Video is required."]
  },
  description: {
    type: String
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food-partner"
  }
});

const foodItemModel = mongoose.model("food-item", foodItemSchema);

module.exports = foodItemModel;
