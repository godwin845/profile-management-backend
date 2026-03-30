import type { RequestHandler, Request } from "express";
import {
  getSkillsService,
  updateSkillsService,
  deleteSkillsService,
} from "../services/skill.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
  body: {
    skills?: string[];
  };
}

/**
 * GET current user's skills
 */
export const getSkills: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const skills = await getSkillsService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(skills);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error", details: errorMessage });
  }
};

/**
 * CREATE or SAVE skills
 */
export const saveSkills: RequestHandler<object, unknown, { skills?: string[] }, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const { skills } = userReq.body;
    if (!skills) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Skills field is required" });
    }

    const result = await updateSkillsService(skills, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Skills must be an array") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to save skills",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE skills
 */
export const updateSkills: RequestHandler<object, unknown, { skills?: string[] }, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const { skills } = userReq.body;
    if (!skills) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Skills field is required" });
    }

    const result = await updateSkillsService(skills, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Skills must be an array") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    if (errorMessage === "Skills not found, create first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update skills",
      details: errorMessage,
    });
  }
};

/**
 * DELETE skills
 */
export const deleteSkill: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const result = await deleteSkillsService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Skills not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete skills",
      details: errorMessage,
    });
  }
};