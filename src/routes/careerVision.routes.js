import express from "express";
import { getCareerVision, createCareerVision, updateCareerVision, deleteCareerVision } from "../controllers/careerVision.controller.js";

const router = express.Router();

router.get("/", getCareerVision);
router.post("/", createCareerVision);
router.put("/:id", updateCareerVision);

// DELETE - delete career vision by ID
router.delete("/:id", deleteCareerVision);

export default router;