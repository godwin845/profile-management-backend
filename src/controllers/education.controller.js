import {
  getEducationService,
  createEducationService,
  updateEducationService,
  deleteEducationService,
} from "../services/education.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's education
export const getEducation = async (req, res) => {
  try {
    const education = await getEducationService(req.user._id);
    res.status(HTTP_STATUS.OK).json(education);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// CREATE education
export const addEducation = async (req, res) => {
  try {
    const education = await createEducationService(req.body, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(education);
  } catch (err) {
    if (err.message === "Education already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create education",
      details: err.message,
    });
  }
};

// UPDATE education
export const updateEducation = async (req, res) => {
  try {
    const education = await updateEducationService(req.body, req.user._id);
    res.status(HTTP_STATUS.OK).json(education);
  } catch (err) {
    if (err.message === "Education not found, create first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update education",
      details: err.message,
    });
  }
};

// DELETE education
export const deleteEducation = async (req, res) => {
  try {
    const result = await deleteEducationService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Education not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete education",
      details: err.message,
    });
  }
};