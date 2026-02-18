import express from "express";
import {
  getEducations,
  addEducation,
  updateEducation,
  deleteEducation
} from "../controllers/education.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEducations);
router.post("/", addEducation);
router.put("/:index", updateEducation);
router.delete("/:index", deleteEducation);

export default router;