import express from "express";
import {
  getAllPosts,
  getPostById,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { body } from "express-validator";

const router = express.Router();

// CREATE new post
router.post(
  "/",
  [
    body("heading").notEmpty().withMessage("Heading is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("adminId").isInt().withMessage("Valid admin ID is required"),
  ],
  createPost
);

// GET all posts by admin (dashboard) - MORE SPECIFIC
router.get("/admin/:adminId", getAdminPosts);

// GET all published posts (homepage)
router.get("/", getAllPosts);

// GET post by ID
router.get("/:id", getPostById);

// UPDATE post
router.put(
  "/:id",
  [
    body("heading").notEmpty().withMessage("Heading is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("image").notEmpty().withMessage("Image is required"),
    body("adminId").isInt().withMessage("Valid admin ID is required"),
  ],
  updatePost
);

// DELETE post
router.delete("/:id", deletePost);

export default router;
