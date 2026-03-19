import {
  getExperienceService,
  addExperienceService,
  updateExperienceService,
  deleteExperienceService,
} from "../services/experience.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's experience
export const getExperience = async (req, res) => {
  try {
    const experience = await getExperienceService(req.user._id);
    res.status(HTTP_STATUS.OK).json(experience);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// ADD experience
export const addExperience = async (req, res) => {
  try {
    const experience = await addExperienceService(req.body, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(experience);
  } catch (err) {
    if (err.message === "Experience already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to add experience",
      details: err.message,
    });
  }
};

// UPDATE experience
export const updateExperience = async (req, res) => {
  try {
    const experience = await updateExperienceService(req.body, req.user._id);
    res.status(HTTP_STATUS.OK).json(experience);
  } catch (err) {
    if (err.message === "Experience not found, add first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update experience",
      details: err.message,
    });
  }
};

// DELETE experience
export const deleteExperience = async (req, res) => {
  try {
    const result = await deleteExperienceService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Experience not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete experience",
      details: err.message,
    });
  }
};