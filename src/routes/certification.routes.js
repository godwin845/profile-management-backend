import express from "express";
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all certificate routes
router.use(protect);

router.get("/", getCertificates);
router.post("/", createCertificate);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;