const foodItemModel = require('../models/foodItem.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');
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
    const foodItem = await foodItemModel.find().populate("foodPartner", "name").sort({ createdAt: -1 });

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

const handleLikeFood = async (req, res) => {
  const { id } = req.body;
  const user = req.user;

  if (!id) {
    return res.status(400).json({
      msg: "Id is required."
    });
  }

  try {
    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: id
    }).lean();

    if (isAlreadyLiked) {
      await likeModel.deleteOne({
        user: user._id,
        food: id
      });

      const updatedFood = await foodItemModel.findByIdAndUpdate(
        id,
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        msg: "Food unlike successfully",
        likeCount: updatedFood.likeCount
      });
    }

    const like = await likeModel.create({
      user: user._id,
      food: id
    });

    const updatedFood = await foodItemModel.findByIdAndUpdate(
      id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    return res.status(201).json({
      msg: "Food like successfully",
      likeCount: updatedFood.likeCount
    });

  } catch (error) {
    console.error("Like error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
};

const handleSaveFood = async (req, res) => {
  const { id } = req.body;
  const user = req.user;

  if (!id) {
    return res.status(400).json({
      msg: "Id is required."
    });
  }

  try {

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: id
    });

    if (isAlreadySaved) {

      await saveModel.deleteOne({
        user: user._id,
        food: id
      });

      return res.status(200).json({
        msg: "Food unsaved successfully"
      });

    }

    const saved = await saveModel.create({
      user: user._id,
      food: id
    });

    return res.status(201).json({
      msg: "Food saved successfully",
      saved
    });

  } catch (error) {
    console.error("Save error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
};

const handleGetSavedFood = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        msg: "Unauthorized user"
      });
    }

    const userId = req.user._id;

    const saved = await saveModel
      .find({ user: userId })
      .populate("food");

    const savedFood = saved.map(item => item.food);

    return res.status(200).json({
      savedFood
    });

  } catch (error) {
    console.error("Get saved food error:", error);

    return res.status(500).json({
      msg: "Internal server error"
    });
  }
};

module.exports = {
  handleCreateFoodItem,
  handleGetFoodItem,
  handleGetFoodItemBasedOnId,
  handleLikeFood,
  handleSaveFood,
  handleGetSavedFood
};
