import express from "express";
import {
  createOrUpdateProfile,
  getAllProfiles,
  deleteProfile,
} from "../controllers/profile.controller.js";
import { uploadFields } from "../utils/upload.js";

const router = express.Router();

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