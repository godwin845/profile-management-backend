import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSocial,
  getSocials,
  updateSocial,
  deleteSocial,
} from "../controllers/social.controller.js";

const router = express.Router();

router.post("/", addSocial);
router.get("/", getSocials);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

export default router;