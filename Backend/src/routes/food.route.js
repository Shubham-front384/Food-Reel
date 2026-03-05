const express = require("express");
const foodController = require("../controllers/food.controller");
const { authFoodPartnerMiddleware, authUserMiddleware } = require("../middleware/middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const foodRouter = express.Router();

foodRouter.post("/", authFoodPartnerMiddleware, upload.single("video"), foodController.handleCreateFoodItem);

foodRouter.get("/", authFoodPartnerMiddleware, foodController.handleGetFoodItem);

foodRouter.get("/saved", authUserMiddleware, foodController.handleGetSavedFood);

foodRouter.get("/:id", foodController.handleGetFoodItemBasedOnId);

foodRouter.post("/like", authUserMiddleware, foodController.handleLikeFood);

foodRouter.post("/save", authUserMiddleware, foodController.handleSaveFood);

module.exports = foodRouter;
