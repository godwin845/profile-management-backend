import express, { Router } from "express";
import { getSocial, addSocial, updateSocial, deleteSocial } from "../controllers/social.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

router.use(protect);

router.get("/", getSocial);
router.post("/", addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

export default router;