import {
  getSocialService,
  createSocialService,
  updateSocialService,
  deleteSocialService,
} from "../services/social.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's social links
export const getSocial = async (req, res) => {
  try {
    const socials = await getSocialService(req.user._id);
    res.status(HTTP_STATUS.OK).json(socials);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// CREATE social links
export const addSocial = async (req, res) => {
  try {
    const { socials } = req.body;
    if (!socials) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Socials field is required" });
    }

    const result = await createSocialService(socials, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (err) {
    if (err.message.includes("must have social and link") || err.message.includes("array")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create social links",
      details: err.message,
    });
  }
};

// UPDATE social links
export const updateSocial = async (req, res) => {
  try {
    const { socials } = req.body;
    if (!socials) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Socials field is required" });
    }

    const result = await updateSocialService(socials, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message.includes("must have social and link") || err.message.includes("array")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
    if (err.message === "Social links not found, create first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update social links",
      details: err.message,
    });
  }
};

// DELETE social links
export const deleteSocial = async (req, res) => {
  try {
    const result = await deleteSocialService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Social links not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete social links",
      details: err.message,
    });
  }
};