import type { RequestHandler } from "express";
import {
  getExperienceService,
  addExperienceService,
  updateExperienceService,
  deleteExperienceService,
} from "../services/experience.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";
import type { IExperience } from "../models/experience.model.ts";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

/**
 * GET current user's experience
 */
export const getExperience: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const experience = await getExperienceService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(experience);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error", details: errorMessage });
  }
};

/**
 * ADD experience
 */
export const addExperience: RequestHandler<object, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const experience = await addExperienceService(req.body as Partial<IExperience>, userReq.user._id);
    res.status(HTTP_STATUS.CREATED).json(experience);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Experience already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to add experience",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE experience
 */
export const updateExperience: RequestHandler<{ id: string }, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const experience = await updateExperienceService(req.params.id, req.body as Partial<IExperience>, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(experience);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Experience not found, add first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update experience",
      details: errorMessage,
    });
  }
};

/**
 * DELETE experience
 */
export const deleteExperience: RequestHandler<{ id: string }, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const result = await deleteExperienceService(req.params.id, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Experience not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete experience",
      details: errorMessage,
    });
  }
};