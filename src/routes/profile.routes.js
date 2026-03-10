import express from "express";
import {
  createOrUpdateProfile,
  getAllProfiles,
  deleteProfile,
} from "../controllers/profile.controller.js";
import { uploadFields } from "../utils/upload.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all profile routes
router.use(protect);

// POST profile
router.post("/", uploadFields, createOrUpdateProfile);

// PUT profile (update)
router.put("/:id", uploadFields, async (req, res) => {
  req.body.id = req.params.id;
  await createOrUpdateProfile(req, res);
});

// GET all profiles
router.get("/", getAllProfiles);

// DELETE profile
router.delete("/:id", deleteProfile);

export default router;