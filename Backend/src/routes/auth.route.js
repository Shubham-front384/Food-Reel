const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

// User
// api/auth/register
authRouter.post("/user/register", authController.handleRegisterUser);
// api/auth/login
authRouter.post("/user/login", authController.handleLoginUser);
// api/auth/logout
authRouter.get("/user/logout", authController.handleLogoutUser);

// Food Partner
// api/food-partner/register
authRouter.post("/food-partner/register", authController.handleFoodPartnerRegisterUser);
// api/food-partner/register
authRouter.post("/food-partner/login", authController.handleFoodPartnerLoginUser);
// api/food-partner/logout
authRouter.post("/food-partner/logout", authController.handleFoodPartnerLogoutUser);

module.exports = authRouter;
