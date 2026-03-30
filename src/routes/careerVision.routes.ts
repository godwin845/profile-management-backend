import express, { Router } from "express";
import {
  createCareerVision,
  updateCareerVision,
  deleteCareerVision,
  getCareerVision,
} from "../controllers/careerVision.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

// Protect all career vision routes
router.use(protect);

router.get("/", getCareerVision);
router.post("/", createCareerVision);
router.put("/:id", updateCareerVision);
router.delete("/:id", deleteCareerVision);

export default router;