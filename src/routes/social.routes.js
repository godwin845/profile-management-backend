import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addSocial,
  getSocials,
  updateSocial,
  deleteSocial,
} from "../controllers/social.controller.js";

const router = express.Router();

router.post("/", protect, addSocial);
router.get("/", protect, getSocials);
router.put("/:id", protect, updateSocial);
router.delete("/:id", protect, deleteSocial);

export default router;