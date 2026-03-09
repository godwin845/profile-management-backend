import express from "express";
import { getSkills, saveSkills, deleteSkill } from "../controllers/skill.controller.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", saveSkills);
router.delete("/:skillName", deleteSkill);

export default router;