import express from "express";
import {
  getEducations,
  addEducation,
  updateEducation,
  deleteEducation
} from "../controllers/education.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getEducations);
router.post("/", protect, addEducation);
router.put("/:index", protect, updateEducation);
router.delete("/:index", protect, deleteEducation);

export default router;