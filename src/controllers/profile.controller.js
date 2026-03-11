import {
  createOrUpdateProfileService,
  getAllProfilesService,
  deleteProfileService,
} from "../services/profile.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const result = await createOrUpdateProfileService(req.body, req.files);
    return res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error("PROFILE_ERROR:", error);

    if (error.message === "Profile not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: error.message });
    }

    // TEMP: return full error details so we can see the cause
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Server error",
      code: error.code || null,
      name: error.name || null,
    });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfilesService();

    res.status(HTTP_STATUS.OK).json(profiles);
  } catch (error) {
    console.error(error);

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
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