import express, { type Request, type Response, Router } from "express";
import { deleteAccount } from "../controllers/account.controller.ts";
import { protect } from "../middleware/auth.middleware.ts";

const router: Router = express.Router();

// DELETE account route (uses JWT auth middleware)
router.post("/delete", protect, (req: Request, res: Response) => deleteAccount(req, res));

export default router;