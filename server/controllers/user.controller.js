import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import { errorHandler } from "../utility/errorHandler.js";
import { validationResult } from "express-validator";

export const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorHandler(errors.array()[0].msg, 400));
  }

  const { email, password } = req.body;
  const profilePicture = req.file?.filename || null;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler("User already exists", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hashedPassword, profilePicture });
  const resUser = user.toObject();
  delete resUser.password;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
  res.cookie("blog_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    sameSite: "strict",
  });
  res.status(201).json({ success: true, responseData: resUser });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new errorHandler(error.array()[0].msg, 400));
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("blog_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ success: true, responseData: user });
});

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('_id email profilePicture');
  res.status(200).json({ success: true, responseData: user });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("blog_token");
  res.status(200).json({ success: true, message: "User logged out successfully" });
});