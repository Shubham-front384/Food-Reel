const authModel = require("../models/auth.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleRegisterUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      msg: "All fields are required."
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      msg: "Password must be at least 6 characters."
    });
  }

  try {
    const isUser = await authModel.findOne({
      $or: [
        { fullName },
        { email }
      ]
    });

    if (isUser) {
      return res.status(409).json({
        msg: (isUser.email === email ? "Email already registered." : "Username already taken.")
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await authModel.create({
      fullName,
      email,
      password: hashPassword
    });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        msg: "JWT secret not configured."
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
      msg: "User register successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Register error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
}

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "All field is required."
    });
  }

  try {
    const isUser = await authModel.findOne({ email }).select("+password");
    if (!isUser) {
      return res.status(400).json({
        msg: "Invalid username or password."
      });
    }

    const comparePassword = await bcrypt.compare(password, isUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Invalid username or password."
      });
    }

    const token = jwt.sign(
      { id: isUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      msg: "User login successfully.",
      user: {
        id: isUser._id,
        fullName: isUser.fullName,
        email: isUser.email
      }
    });
  } catch (error) {
    console.error("Login error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

const handleLogoutUser = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    msg: "User logout successfully."
  });
}

const handleFoodPartnerRegisterUser = async (req, res) => {
  const { fullName, contactName, phone, address, email, password } = req.body;

  if (!fullName || !contactName || !phone || !address || !email || !password) {
    return res.status(400).json({
      msg: "All fields are required."
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      msg: "Password must be at least 6 characters."
    });
  }

  if(phone.length < 10) {
    return res.status(400).json({
      msg: "Phone number must be at least 10 characters."
    });
  }

  try {
    const isUser = await foodPartnerModel.findOne({
      $or: [
        { fullName },
        { email }
      ]
    });
    if (isUser) {
      return res.status(409).json({
        msg: (isUser.email === email ? "Email already registered." : "Username already taken.")
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const foodPartnerUser = await foodPartnerModel.create({
      contactName,
      phone,
      address,
      fullName,
      email,
      password: hashPassword
    });

    const token = jwt.sign(
      {
        id: foodPartnerUser._id,
        fullName: foodPartnerUser.fullName
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(201).json({
      msg: "Food partner user register successfully.",
      foodPartnerUser: {
        id: foodPartnerUser._id,
        fullName: foodPartnerUser.fullName,
        contactName: foodPartnerUser.contactName,
        phone: foodPartnerUser.phone,
        address: foodPartnerUser.address,
        email: foodPartnerUser.email
      }
    });
  } catch (error) {
    console.error("Food partner register error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

const handleFoodPartnerLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "All fields are required."
    });
  }

  try {
    const isUser = await foodPartnerModel.findOne({ email }).select("+password");
    if (!isUser) {
      return res.status(400).json({
        msg: "Invalid username or password."
      });
    }

    const comparePassword = await bcrypt.compare(password, isUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Invalid username or password."
      });
    }

    const token = jwt.sign(
      { id: isUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      msg: "Food partner user login successfully.",
      foodPartnerUser: {
        id: isUser._id,
        fullName: isUser.fullName,
        email: isUser.email
      }
    });
  } catch (error) {
    console.error("Food partner login error: ", error.message);
    return res.status(500).json({
      msg: "Internal server error."
    });
  }
}

const handleFoodPartnerLogoutUser = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    msg: "Food partner user logout successfully."
  });
}

module.exports = {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
  handleFoodPartnerRegisterUser,
  handleFoodPartnerLoginUser,
  handleFoodPartnerLogoutUser
}
