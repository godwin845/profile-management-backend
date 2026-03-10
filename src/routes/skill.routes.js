import express from "express";
import {
  getSkills,
  saveSkills,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all skill routes
router.use(protect);

router.get("/", getSkills);
router.post("/", saveSkills);
router.delete("/:skillName", deleteSkill);

export default router;