import express from "express";
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all experience routes
router.use(protect);

router.get("/", getExperience);
router.post("/", addExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;