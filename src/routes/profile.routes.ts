import express, { Router, type Request, type Response } from "express";
import {
  createOrUpdateProfile,
  getProfile,
  deleteProfile,
} from "../controllers/profile.controller.ts";
import { uploadFields } from "../utils/upload.ts";
import { protect } from "../middleware/auth.middleware.ts";
import { type AuthenticatedRequest } from "../controllers/profile.controller.ts";

const router: Router = express.Router();

router.use(protect);

router.post("/", uploadFields, (req: Request, res: Response) => createOrUpdateProfile(req as AuthenticatedRequest, res));

router.put("/:id", uploadFields, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  authReq.body.id = authReq.params.id;
  await createOrUpdateProfile(authReq, res);
});
router.get("/", getProfile);
router.delete("/:id", deleteProfile);

export default router; 