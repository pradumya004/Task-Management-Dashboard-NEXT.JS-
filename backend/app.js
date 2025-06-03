import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config(
    { path: './.env' }
);

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully!",
        timestamp: new Date().toISOString()
    });
})

// Import Routes
import taskRoutes from "./routes/task.routes.js";

app.use("/api/tasks", taskRoutes);

export { app };