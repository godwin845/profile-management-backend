import type { Request, RequestHandler } from "express";
import {
  getSocialService,
  createSocialService,
  updateSocialService,
  deleteSocialService,
} from "../services/social.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
  body: {
    socials?: { social: string; link: string }[];
  };
}

/**
 * GET current user's social links
 */
export const getSocial: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  try {
    const socials = await getSocialService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(socials);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error", details: errorMessage });
  }
};

/**
 * CREATE social links
 */
export const addSocial: RequestHandler<object, unknown, { socials?: { social: string; link: string }[] }, object> = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  try {
    const { socials } = userReq.body;
    if (!socials) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Socials field is required" });
    }

    const result = await createSocialService(socials, userReq.user._id);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage.includes("must have social and link") || errorMessage.includes("array")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create social links",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE social links
 */
export const updateSocial: RequestHandler<object, unknown, { socials?: { social: string; link: string }[] }, object> = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  try {
    const { socials } = userReq.body;
    if (!socials) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Socials field is required" });
    }

    const result = await updateSocialService(socials, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage.includes("must have social and link") || errorMessage.includes("array")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage });
    }
    if (errorMessage === "Social links not found, create first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update social links",
      details: errorMessage,
    });
  }
};

/**
 * DELETE social links
 */
export const deleteSocial: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as AuthenticatedRequest;
  try {
    const result = await deleteSocialService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Social links not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete social links",
      details: errorMessage,
    });
  }
};