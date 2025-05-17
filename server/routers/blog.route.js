import express from "express";
import { body } from "express-validator";
import {
    createBlog,
    getBlogs,
    getMyBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} from "../controllers/blog.controller.js";
import { isAuth } from "../middlewares/auth.js";
import { uploadMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.post(
    "/",
    isAuth,
    uploadMiddleware.single("image"),
    [
        body("title").trim().notEmpty().withMessage("Title is required"),
        body("description").trim().notEmpty().withMessage("Description is required"),
    ],
    createBlog
);

router.get("/", getBlogs);
router.get("/my-blogs", isAuth, getMyBlogs);
router.get("/:id", getBlogById);

router.put(
    "/:id",
    isAuth,
    uploadMiddleware.single("image"),
    [
        body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
        body("description").optional().trim().notEmpty().withMessage("Description cannot be empty"),
    ],
    updateBlog
);

router.delete(
    "/:id",
    isAuth,
    deleteBlog
)


export default router;
