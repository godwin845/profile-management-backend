import express from "express";
import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification
} from "../controllers/certification.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertifications);
router.post("/", addCertification);
router.put("/:index", updateCertification);
router.delete("/:index", deleteCertification);

export default router;