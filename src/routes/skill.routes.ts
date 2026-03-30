import express, { Router } from "express";
import { getSkills, saveSkills, deleteSkill } from "../controllers/skill.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.use(protect);

router.get("/", getSkills);
router.post("/", saveSkills);
router.delete("/:skillName", deleteSkill);

export default router;