import express from "express";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import imageRouter from "./routes/image.routes.js";
import profileRouter from "./routes/profile.routes.js";
import dbConnect from "./db/db.js";
import { ApiError } from "./utils/api-error.js";
import dotenv from "dotenv";

const app = express();

dotenv.config({
    path: "./.env",
});

dbConnect();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://creativeshowcase.vercel.app",
            "https://creativeshowcase.sahinmallick.tech/"
        ],
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", imageRouter);
app.use("/api/v1/profile", profileRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;
