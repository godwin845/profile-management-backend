import {
  createOrUpdateProfileService,
  deleteProfileService,
  getProfileService,
} from "../services/profile.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    // Pass req.user._id; service handles create or update automatically
    const result = await createOrUpdateProfileService(req.body, req.files, req.user._id);

    return res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error("PROFILE_ERROR:", error);

    // Handle Mongoose unique constraint errors
    if (error.code === 11000) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        error: "Email or profile already exists",
        details: error.keyValue,
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Server error",
      code: error.code || null,
      name: error.name || null,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await getProfileService(req.user._id);
    return res.status(HTTP_STATUS.OK).json(profile);
  } catch (error) {
    console.error("PROFILE_ERROR:", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const result = await deleteProfileService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error(error);

    if (error.message === "Profile not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};