import express from "express";
import {
  getCareerVision,
  createCareerVision,
  updateCareerVision,
  deleteCareerVision,
} from "../controllers/careerVision.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all career vision routes
router.use(protect);

router.get("/", getCareerVision);
router.post("/", createCareerVision);
router.put("/:id", updateCareerVision);

// DELETE - delete career vision by ID
router.delete("/:id", deleteCareerVision);

export default router;