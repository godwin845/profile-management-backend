import express from "express";
import { getProfile, createProfile, updateProfile } from "../controllers/profile.controller.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/", upload.fields([{ name: "profileImage" }, { name: "resume" }]), createProfile);
router.put("/:id", upload.fields([{ name: "profileImage" }, { name: "resume" }]), updateProfile);

export default router;