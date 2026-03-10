import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all experience routes
router.use(protect);

router.get("/", getExperiences);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;