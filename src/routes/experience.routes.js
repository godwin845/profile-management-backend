import express from "express";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", addExperience);
router.put("/:index", updateExperience);
router.delete("/:index", deleteExperience);

export default router;