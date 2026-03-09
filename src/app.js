import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import morgan from "morgan";
import path from "path";

import profileRoutes from "./routes/profile.routes.js";

import careerVisionRoutes from "./routes/careerVision.routes.js";

import authRoutes from "./routes/auth.routes.js";

import accountRoutes from "./routes/account.routes.js";

import socialRoutes from "./routes/social.routes.js";

import skillRoutes from "./routes/skill.routes.js";

import educationRoutes from "./routes/education.routes.js";

import experienceRoutes from "./routes/experience.routes.js";

import certificationRoutes from "./routes/certification.routes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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