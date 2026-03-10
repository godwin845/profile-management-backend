import express from "express";
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all education routes
router.use(protect);

router.get("/", getEducation);

router.post("/", addEducation);

router.put("/:id", updateEducation);

router.delete("/:id", deleteEducation);

export default router;