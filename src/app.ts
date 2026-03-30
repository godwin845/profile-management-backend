import express, { type Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

import profileRoutes from "./routes/profile.routes.ts";
import careerVisionRoutes from "./routes/careerVision.routes.ts";
import authRoutes from "./routes/auth.routes.ts";
import accountRoutes from "./routes/account.routes.ts";
import socialRoutes from "./routes/social.routes.ts";
import skillRoutes from "./routes/skill.routes.ts";
import educationRoutes from "./routes/education.routes.ts";
import experienceRoutes from "./routes/experience.routes.ts";
import certificationRoutes from "./routes/certification.routes.ts";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Static uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/profile", profileRoutes);
app.use("/api/career-vision", careerVisionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/certificates", certificationRoutes);

export default app;