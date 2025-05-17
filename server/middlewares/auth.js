import jwt from "jsonwebtoken";
import asyncHandler from "../utility/asyncHandler.js";
import { errorHandler } from "../utility/errorHandler.js";

export const isAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.blog_token || req.headers["authorization"]?.replace("Bearer ", "")
  if (!token) {
    return next(new errorHandler("Invalid token", 400));
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = tokenData;
  next();
});
