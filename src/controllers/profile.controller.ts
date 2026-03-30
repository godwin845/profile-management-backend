import type { Request, RequestHandler, Response } from "express";
import {
  createOrUpdateProfileService,
  deleteProfileService,
  getProfileService,
} from "../services/profile.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

/**
 * Extend Express Request type to include authenticated user and uploaded files
 */
export interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
  files?: {
    profileImage?: Express.Multer.File[];
    resumeFile?: Express.Multer.File[];
  };
}

/**
 * CREATE or UPDATE profile
 */
export const createOrUpdateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await createOrUpdateProfileService(req.body, req.files || {}, req.user._id);
    return res.status(HTTP_STATUS.OK).json(result); 
  } catch (error: unknown) {
    console.error("PROFILE_ERROR:", error);

    // Handle Mongoose unique constraint errors
    if (error instanceof Object && 'code' in error && error.code === 11000) {
      const err = error as { code: number; keyValue: unknown };
      return res.status(HTTP_STATUS.CONFLICT).json({
        error: "Email or profile already exists",
        details: err.keyValue,
      });
    }

    const err = error as { message?: string; code?: unknown; name?: string };
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: err.message || "Server error",
      code: err.code || null,
      name: err.name || null,
    });
  }
};

/**
 * GET profile
 */
export const getProfile: RequestHandler<object, unknown, object, object> = async (req, res) => {
  try {
    const authenticatedReq = req as AuthenticatedRequest;
    const profile = await getProfileService(authenticatedReq.user._id);
    return res.status(HTTP_STATUS.OK).json(profile);
  } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server error", errorMessage });
  }
};

/**
 * DELETE profile
 */
export const deleteProfile: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== "string") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid profile ID" });
    }
    const result = await deleteProfileService(id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Profile not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};