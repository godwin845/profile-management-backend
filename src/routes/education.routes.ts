import express, { Router } from "express";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.use(protect);

router.get("/", getEducation);
router.post("/", addEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;