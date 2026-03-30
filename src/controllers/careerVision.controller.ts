import type { Request } from "express";
import {
  getCareerVisionService,
  createCareerVisionService,
  updateCareerVisionService,
  deleteCareerVisionService,
} from "../services/careerVision.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

import type { RequestHandler } from "express";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

/**
 * GET current user's career vision
 */
/**
 * GET current user's career vision
 */

export const getCareerVision: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthenticatedRequest).user._id;
    const vision = await getCareerVisionService(userId);
    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Server Error",
      details: errorMessage,
    });
  }
};

/**
 * CREATE career vision
 */

export const createCareerVision: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthenticatedRequest).user._id;

    const vision = await createCareerVisionService(req.body, userId);

    res.status(HTTP_STATUS.CREATED).json(vision);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create career vision",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE career vision
 */
export const updateCareerVision: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthenticatedRequest).user._id;

    const vision = await updateCareerVisionService(req.body, userId);

    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage === "Career vision not found") {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
      return; // ✅ important
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update career vision",
      details: errorMessage,
    });
  }
};

/**
 * DELETE current user's career vision
 */
export const deleteCareerVision: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthenticatedRequest).user._id;

    const result = await deleteCareerVisionService(userId);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    if (errorMessage === "Career vision not found") {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
      return; // ✅ important
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete career vision",
      details: errorMessage,
    });
  }
};