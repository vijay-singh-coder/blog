import { validationResult } from "express-validator";
import { errorHandler } from "../utility/errorHandler.js";
import asyncHandler from "../utility/asyncHandler.js";
import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";

export const addComment = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorHandler(errors.array()[0].msg, 400));
  }

  const { content } = req.body;
  const blogId = req.params.id;

  if (!req.user.id) {
    return next(new errorHandler("Unauthorized access", 401));
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new errorHandler("Blog not found", 404));
  }

  const comment = await Comment.create({
    blog: blogId,
    user: req.user._id,
    content,
  });

  blog.comments.push(comment._id);
  await blog.save();

  res.status(201).json({ success: true, responseData: comment });
});



export const replyToComment = asyncHandler(async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorHandler(errors.array()[0].msg, 400));
  }

  const { content } = req.body;
  const commentId = req.params.id;

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    return next(new errorHandler("Unauthorized access", 401));
  }

  // Find parent comment
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new errorHandler("Comment not found", 404));
  }

  // Add reply
  comment.replies.push({
    user: req.user._id,
    content,
  });

  await comment.save();

  res.status(201).json({ success: true, responseData: comment });
});


