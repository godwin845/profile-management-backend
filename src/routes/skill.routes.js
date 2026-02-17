import express from "express";
import { getSkills, saveSkills } from "../controllers/skill.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSkills);
router.post("/", protect, saveSkills);

export default router;