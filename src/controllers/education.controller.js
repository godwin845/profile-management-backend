import {
  getEducationService,
  addEducationService,
  updateEducationService,
  deleteEducationService
} from "../services/education.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getEducation = async (req, res) => {
  try {
    const education = await getEducationService();

    res.status(HTTP_STATUS.OK).json(education);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const addEducation = async (req, res) => {
  try {
    const education = await addEducationService(req.body);

    res.status(HTTP_STATUS.CREATED).json(education);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await updateEducationService(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json(education);
  } catch (error) {
    if (error.message === "Education not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const result = await deleteEducationService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    if (error.message === "Education not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};