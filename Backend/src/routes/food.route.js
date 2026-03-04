const express = require("express");
const foodController = require("../controllers/food.controller");
const { authFoodPartnerMiddleware } = require("../middleware/middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const foodRouter = express.Router();

foodRouter.post("/", authFoodPartnerMiddleware, upload.single("video"), foodController.handleCreateFoodItem);

foodRouter.get("/", authFoodPartnerMiddleware, foodController.handleGetFoodItem);

foodRouter.get("/:id", foodController.handleGetFoodItemBasedOnId);

module.exports = foodRouter;
