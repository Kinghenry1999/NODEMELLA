import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import sendemailRoutes from "./routes/emailRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Enhanced CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://nodemella.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use("/api/auth", authRoutes);

// Email routes
app.use("/api/email", sendemailRoutes);

// Post routes
app.use("/api/posts", postRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
