import express from "express"
import { isAuth } from "../middlewares/auth.js"
import { addComment, replyToComment } from "../controllers/comment.controller.js"
import { body } from "express-validator"

const router = express.Router();

router.post("/blogs/:id/comments",
    isAuth,
    [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Comment content is required"),
    ],
    addComment
);
router.post("/comments/:id/reply", isAuth,
    [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Reply content is required"),
    ],
    replyToComment
);

export default router;