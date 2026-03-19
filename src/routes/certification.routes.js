import express from "express";
import {
  getCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all certificate routes
router.use(protect);

router.get("/", getCertificate);
router.post("/", addCertificate);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;