import express from "express";
import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification
} from "../controllers/certification.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getCertifications);
router.post("/", protect, addCertification);
router.put("/:index", protect, updateCertification);
router.delete("/:index", protect, deleteCertification);

export default router;