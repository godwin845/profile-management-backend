import express from "express";
import { getProfile, createProfile, updateProfile } from "../controllers/profile.controller";
import { upload } from "../utils/upload";

const router = express.Router();

router.get("/", getProfile);
router.post("/", upload.fields([{ name: "profileImage" }, { name: "resume" }]), createProfile);
router.put("/:id", upload.fields([{ name: "profileImage" }, { name: "resume" }]), updateProfile);

export default router;