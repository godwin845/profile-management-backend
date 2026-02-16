import express from "express";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience
} from "../controllers/experience.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getExperiences);
router.post("/", protect, addExperience);
router.put("/:index", protect, updateExperience);
router.delete("/:index", protect, deleteExperience);

export default router;