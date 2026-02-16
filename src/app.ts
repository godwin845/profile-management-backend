import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import profileRoutes from "./routes/profile.routes";
import careerVisionRoutes from "./routes/careerVision.routes";

import authRoutes from "./routes/auth.routes";

import skillRoutes from "./routes/skill.routes";
import educationRoutes from "./routes/education.routes";
import experienceRoutes from "./routes/experience.routes";
import certificationRoutes from "./routes/certification.routes";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/profile", profileRoutes);
app.use("/api/career-vision", careerVisionRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/certifications", certificationRoutes);

export default app;