import asyncHandler from "../utility/asyncHandler.js";
import { validationResult } from "express-validator";
import Blog from "../models/blog.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const createBlog = asyncHandler(async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorHandler(errors.array()[0].msg, 400));
  }

  const { title, description } = req.body
  const image = req.file ? req.file.filename : null;

  const user = req.user.id
  const blog = await Blog.create({ user, title, description, image });
  res.status(201).json({ success: true, blog });
});

export const getBlogs = asyncHandler(async (req, res, next) => {

  const blogs = await Blog.find()
    .populate("user", "email profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "email",
      },
    });

  res.status(200).json({ success: true, blogs });
});

export const getMyBlogs = asyncHandler(async (req, res, next) => { 

  const blogs = await Blog.find({ user: req.user.id })
    .populate("user", "email profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "email",
      },
    });

  res.status(200).json({ success: true, blogs });
});


export const getBlogById = asyncHandler(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id)
    .populate("user", "email profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "email",
      },
    });

  if (!blog) {
    return next(new errorHandler("Blog not found", 404));
  }

  res.status(200).json({ success: true, responseData: blog });
});

export const updateBlog = asyncHandler(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new errorHandler("Blog not found", 404));
  }

  if (blog.user.toString() !== req.user.id) {
    return next(new errorHandler("Not authorized to update this blog", 403));
  }

  const { title, description } = req.body;
  const image = req.file ? req.file.filename : blog.image;

  blog.title = title || blog.title;
  blog.description = description || blog.description;
  blog.image = image;

  await blog.save();

  res.status(200).json({ success: true, responseData: blog });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new errorHandler("Blog not found", 404));
  }

  if (blog.user.toString() !== req.user.id) {
    return next(new errorHandler("Not authorized to delete this blog", 403));
  }

  await blog.deleteOne();

  res.status(200).json({ success: true, message: "Blog deleted successfully" });
});