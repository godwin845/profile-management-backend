import express from "express";
import { getSkills, saveSkills } from "../controllers/skill.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getSkills);
router.post("/", protect, saveSkills);

export default router;