const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const AuthService = require("../services/auth.service");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  // get the user payload
  const userPayload = req.user;

  const user = await User.findOne({ _id: userPayload._id });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Not authenticated",
    });
  }

  if (user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: false,
      message: "Not authorized to perform this action",
    });
  }
  next();
};
