import express from "express";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import imageRouter from "./routes/image.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", imageRouter);
app.use("/api/v1/profile", profileRouter);

export default app;
