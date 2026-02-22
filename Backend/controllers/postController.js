import pool from "../config/db.js";
import { validationResult } from "express-validator";

// GET ALL PUBLISHED POSTS
export const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT p.id, p.heading, p.content, p.image, p.created_at, p.updated_at, u.name as admin_name FROM posts p JOIN users u ON p.admin_id = u.id WHERE p.published = true ORDER BY p.created_at DESC"
    );
    res.status(200).json({ success: true, posts: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET POST BY ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT p.id, p.heading, p.content, p.image, p.created_at, p.updated_at, p.admin_id, u.name as admin_name FROM posts p JOIN users u ON p.admin_id = u.id WHERE p.id = $1 AND p.published = true",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(200).json({ success: true, post: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL POSTS BY ADMIN (with published and unpublished)
export const getAdminPosts = async (req, res) => {
  const { adminId } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, heading, content, image, created_at, updated_at, published FROM posts WHERE admin_id = $1 ORDER BY created_at DESC",
      [adminId]
    );
    res.status(200).json({ success: true, posts: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE NEW POST
export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { heading, content, image, adminId } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO posts(heading, content, image, admin_id, published) VALUES($1, $2, $3, $4, true) RETURNING id, heading, content, image, created_at, admin_id",
      [heading, content, image, adminId]
    );
    res.status(201).json({
      success: true,
      message: "Post created and published successfully!",
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const { heading, content, image, adminId } = req.body;

  try {
    // Check if post exists and belongs to admin
    const checkResult = await pool.query(
      "SELECT admin_id FROM posts WHERE id = $1",
      [id]
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    if (checkResult.rows[0].admin_id !== adminId) {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized to edit this post" });
    }

    const result = await pool.query(
      "UPDATE posts SET heading = $1, content = $2, image = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, heading, content, image, created_at, updated_at",
      [heading, content, image, id]
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { adminId } = req.body;

  try {
    // Check if post exists and belongs to admin
    const checkResult = await pool.query(
      "SELECT admin_id FROM posts WHERE id = $1",
      [id]
    );
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    if (checkResult.rows[0].admin_id !== adminId) {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized to delete this post" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
