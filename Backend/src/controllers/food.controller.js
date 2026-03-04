const foodItemModel = require('../models/foodItem.model');
const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');
const { ImageKit, toFile } = require('@imagekit/nodejs');
const { v4: uuid } = require("uuid");

const imageKit = new ImageKit({
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

const handleCreateFoodItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.foodPartner;

    const file = await imageKit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), 'file'),
      fileName: uuid(),
      folder: 'Food-View',
    });

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        msg: 'Name and description are required.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "Video file is required."
      });
    }

    const isFood = await foodItemModel.findOne({
      $or: [{ name }],
    });
    if (isFood) {
      return res.status(400).json({
        success: false,
        msg: 'Food item already exists.',
      });
    }

    const newFood = await foodItemModel.create({
      name,
      description,
      foodPartner: id,
      video: file.url,
    });

    return res.status(201).json({
      success: true,
      msg: 'Food item create successfully.',
      newFood
    });
  } catch (error) {
    console.error('Food item create: ', error.message);
    return res.status(500).json({
      msg: 'Internal server error.',
    });
  }
};

const handleGetFoodItem = async (req, res) => {
  try {
    const foodItem = await foodItemModel.find();

    return res.status(200).json({
      msg: "Food item fetched successfully.",
      foodItem
    });
  } catch (error) {
    console.error("Get food item error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

const handleGetFoodItemBasedOnId = async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      msg: "Id is required."
    });
  }
  try {
    const foodPartner = await foodPartnerModel.findById(id);
    const foodItemByFoodPartner = await foodItemModel.find({ foodPartner: id });

    if (!foodPartner) {
      return res.status(404).json({
        msg: "Food partner not found."
      });
    }
    
    return res.status(200).json({
      msg: "Food partner data fetched successfully.",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItem: foodItemByFoodPartner
      }
    });
  } catch (error) {
    console.error("Get Food by id error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

module.exports = {
  handleCreateFoodItem,
  handleGetFoodItem,
  handleGetFoodItemBasedOnId
};
