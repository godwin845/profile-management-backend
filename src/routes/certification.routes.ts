import express, { Router } from "express";
import {
  getCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certification.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.use(protect);

router.get("/", getCertificate);
router.post("/", addCertificate);
router.put("/:id", updateCertificate);
router.delete("/:id", deleteCertificate);

export default router;