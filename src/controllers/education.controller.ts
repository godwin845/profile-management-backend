import type { RequestHandler } from "express";
import type { IEducation } from "../models/education.model.ts";
import {
  getEducationService,
  createEducationService,
  updateEducationService,
  deleteEducationService,
} from "../services/education.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

/**
 * GET current user's education
 */
export const getEducation: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const education = await getEducationService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(education);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error", details: errorMessage });
  }
};

/**
 * ADD education
 */
export const addEducation: RequestHandler<object, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const education = await createEducationService(req.body as Partial<IEducation>, userReq.user._id);
    res.status(HTTP_STATUS.CREATED).json(education);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Education already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to add education",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE education
 */
export const updateEducation: RequestHandler<{ id: string }, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const education = await updateEducationService(req.params.id, req.body as Partial<IEducation>, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(education);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Education not found, add first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update education",
      details: errorMessage,
    });
  }
};

/**
 * DELETE education
 */
export const deleteEducation: RequestHandler<{ id: string }, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const result = await deleteEducationService(req.params.id, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Education not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete education",
      details: errorMessage,
    });
  }
};