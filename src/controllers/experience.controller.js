import {
  getExperiencesService,
  createExperienceService,
  updateExperienceService,
  deleteExperienceService
} from "../services/experience.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await getExperiencesService();

    res.status(HTTP_STATUS.OK).json(experiences);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const experience = await createExperienceService(req.body);

    res.status(HTTP_STATUS.CREATED).json(experience);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await updateExperienceService(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json(experience);
  } catch (error) {
    if (error.message === "Experience not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const result = await deleteExperienceService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    if (error.message === "Experience not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};