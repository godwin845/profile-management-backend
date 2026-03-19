import {
  getSkillsService,
  createSkillsService,
  updateSkillsService,
  deleteSkillsService,
} from "../services/skill.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's skills
export const getSkills = async (req, res) => {
  try {
    const skills = await getSkillsService(req.user._id);
    res.status(HTTP_STATUS.OK).json(skills);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// CREATE skills
export const saveSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Skills field is required" });
    }

    const result = await updateSkillsService(skills, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Skills must be an array") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to save skills",
      details: err.message,
    });
  }
};

// UPDATE skills
export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!skills) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Skills field is required" });
    }

    const result = await updateSkillsService(skills, req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Skills must be an array") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
    if (err.message === "Skills not found, create first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update skills",
      details: err.message,
    });
  }
};

// DELETE skills
export const deleteSkill = async (req, res) => {
  try {
    const result = await deleteSkillsService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Skills not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete skills",
      details: err.message,
    });
  }
};