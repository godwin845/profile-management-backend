import {
  getSkillsService,
  saveSkillsService,
  deleteSkillService,
} from "../services/skill.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await getSkillsService();

    res.status(HTTP_STATUS.OK).json(skills);
  } catch (error) {
    console.log(error);

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch skills" });
  }
};

// POST skills
export const saveSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Skills field is required" });
    }

    const result = await saveSkillsService(skills);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    console.error("Error saving skills:", error);

    if (error.message === "Skills must be an array") {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.message });
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to save skills",
    });
  }
};

// DELETE skill
export const deleteSkill = async (req, res) => {
  try {
    const decodedSkillName = decodeURIComponent(req.params.skillName);

    const result = await deleteSkillService(decodedSkillName);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    if (error.message === "Skill not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete skill" });
  }
};