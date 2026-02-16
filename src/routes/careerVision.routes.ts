import express from "express";
import { getCareerVision, createCareerVision, updateCareerVision } from "../controllers/careerVision.controller";

const router = express.Router();

router.get("/", getCareerVision);
router.post("/", createCareerVision);
router.put("/:id", updateCareerVision);

export default router;