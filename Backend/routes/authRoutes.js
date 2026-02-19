import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/userControllers.js";
import { body, validationResult } from "express-validator";


const router = express.Router();

// Route that your React frontend calls
// POST /api/auth/register
router.post(
  "/register",
  // ✅ Validation middleware
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);


router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  resetPassword
);



export default router;
