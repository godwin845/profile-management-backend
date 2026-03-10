import express from "express";
import {
  getAllSocials,
  addSocial,
  updateSocial,
  deleteSocial,
} from "../controllers/social.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all social routes
router.use(protect);

// GET all socials
router.get("/", getAllSocials);

// POST new social
router.post("/", addSocial);

// PUT update social
router.put("/:id", updateSocial);

// DELETE social
router.delete("/:id", deleteSocial);

export default router;