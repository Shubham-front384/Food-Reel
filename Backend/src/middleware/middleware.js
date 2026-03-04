const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.model");
const authModel = require("../models/auth.model");

async function authFoodPartnerMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      msg: "Unauthorize access Token expire."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    console.error("Token middleware error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      msg: "Unauthorize access Token expire."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userToken = await authModel.findById(decoded.id);

    req.user = userToken;
    next();
  } catch (error) {
    console.error("Token middleware error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware
};
