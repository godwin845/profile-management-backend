import express from "express";
import { deleteAccount } from "../controllers/account.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/delete", protect, deleteAccount);

export default router;