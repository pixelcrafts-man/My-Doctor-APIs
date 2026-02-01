import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config.js";

// ⭐ VERY IMPORTANT — DATABASE CONNECT HERE ⭐
import "./config/database.js";  
// 🟢 This will print DB connected message on startup

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Routes
import doctorRoutes from "./routes/doctor.routes.js";
app.use("/api/doctors", doctorRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API Working Perfectly!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;

