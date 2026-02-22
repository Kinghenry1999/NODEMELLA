import { validationResult } from "express-validator";
import pool from "../config/db.js";
import bcrypt from "bcryptjs"; // make sure bcryptjs is installed
import transporter from "../config/mailer.js";

// Helper function to send registration confirmation email
const sendRegistrationEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: `"My App" <${process.env.emailUser}>`,
      to: email,
      subject: "Welcome to My App 🎉",
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 0;">
        
        <table align="center" width="100%" style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; padding:25px; text-align:center;">
              <h1 style="color:white; margin:0;">My App</h1>
              <p style="color:#e0e7ff; margin:5px 0 0;">Welcome aboard 🚀</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px;">
              <h2 style="margin-top:0; color:#333;">Hi ${name},</h2>

              <p style="color:#555; line-height:1.6;">
                Thank you for registering with <strong>My App</strong>.  
                Your account has been created successfully and you're ready to get started.
              </p>

              <p style="color:#555; line-height:1.6;">
                Click the button below to log in and explore all the features we built just for you.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="http://localhost:5173/login"
                  style="background:#4f46e5; color:white; padding:12px 28px; text-decoration:none; border-radius:6px; font-weight:bold;">
                  Login to Your Account
                </a>
              </div>

              <p style="color:#777; font-size:14px;">
                If you did not create this account, please ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} My App. All rights reserved. <br/>
              Need help? Contact support anytime.
            </td>
          </tr>

        </table>
      </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error sending registration email:", error.message);
    return false;
  }
};

// REGISTER USER
export const registerUser = async (req, res) => {
  // ✅ Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, error: "Email already registered. Please login instead." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    
    const newUser = result.rows[0];
    
    // Send confirmation email (non-blocking)
    sendRegistrationEmail(name, email).catch(err => {
      console.error("Email send error:", err.message);
    });
    
    res.status(201).json({ 
      success: true,
      message: "User registered successfully! You can now login.",
      user: newUser 
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ success: false, error: "Registration failed. Please try again." });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check validation
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }
    
    // Query database
    const result = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }
    
    const user = result.rows[0];
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }
    
    // Successful login
    res.status(200).json({ 
      success: true,
      message: "Login successful", 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, error: "Login failed. Please try again." });
  }
};

// Helper function to send forgot password email
const sendForgotPasswordEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: `"My App" <${process.env.emailUser}>`,
      to: email,
      subject: "Password Recovery - My App 🔐",
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 0;">
        
        <table align="center" width="100%" style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; padding:25px; text-align:center;">
              <h1 style="color:white; margin:0;">My App</h1>
              <p style="color:#e0e7ff; margin:5px 0 0;">Password Recovery 🔐</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px;">
              <h2 style="margin-top:0; color:#333;">Hi ${name},</h2>

              <p style="color:#555; line-height:1.6;">
                We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
              </p>

              <p style="color:#555; line-height:1.6;">
                Click the button below to reset your password. This link is valid for 24 hours.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="http://localhost:5173/reset-password"
                  style="background:#4f46e5; color:white; padding:12px 28px; text-decoration:none; border-radius:6px; font-weight:bold;">
                  Reset Your Password
                </a>
              </div>

              <p style="color:#ff6b6b; font-size:14px; font-weight:bold;">
                For security reasons, never share your password with anyone.
              </p>

              <p style="color:#777; font-size:14px;">
                If the button above doesn't work, copy and paste this link into your browser:
                <br/>
                <a href="http://localhost:5173/reset-password" style="color:#4f46e5;">http://localhost:5173/reset-password</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} My App. All rights reserved. <br/>
              Need help? Contact support anytime.
            </td>
          </tr>

        </table>
      </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error sending forgot password email:", error.message);
    return false;
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    const user = result.rows[0];
    
    // Send password recovery email
    await sendForgotPasswordEmail(user.name, email);

    res.status(200).json({ message: "Password recovery email sent successfully. Please check your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  // ✅ Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, newPassword } = req.body;

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    res.status(200).json({ message: "Password reset successfully! You can now login with your new password." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
