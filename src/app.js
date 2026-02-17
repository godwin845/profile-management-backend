import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import profileRoutes from "./routes/profile.routes.js";
import careerVisionRoutes from "./routes/careerVision.routes.js";

import authRoutes from "./routes/auth.routes.js";

import accountRoutes from "./routes/account.routes.js";

import socialRoutes from "./routes/social.routes.js";

import skillRoutes from "./routes/skill.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import certificationRoutes from "./routes/certification.routes.js";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/profile", profileRoutes);
app.use("/api/career-vision", careerVisionRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/account", accountRoutes);

app.use("/api/socials", socialRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/certifications", certificationRoutes);

export default app;