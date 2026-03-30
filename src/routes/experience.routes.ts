import express, { Router } from "express";
import {
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.use(protect);

router.get("/", getExperience);
router.post("/", addExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;