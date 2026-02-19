import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import sendemailRoutes from "./routes/emailRoutes.js";

const app = express();

// Middleware
app.use(cors({ origin: 'https://nodemella.vercel.app', credentials: true }));
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Email routes
app.use("/api/email", sendemailRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
