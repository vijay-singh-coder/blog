import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getDashboard,
  logoutUser,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.js";
import { uploadMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/signup",
  uploadMiddleware.single("profilePicture"),
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser
);

router.get("/dashboard", isAuth, getDashboard);

router.get("/logout", logoutUser);

export default router;
