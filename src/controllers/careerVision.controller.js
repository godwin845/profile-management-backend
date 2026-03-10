import {
  getCareerVisionService,
  createCareerVisionService,
  updateCareerVisionService,
  deleteCareerVisionService
} from "../services/careerVision.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getCareerVision = async (req, res) => {
  try {
    const vision = await getCareerVisionService();
    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error", error: err });
  }
};

export const createCareerVision = async (req, res) => {
  try {
    const vision = await createCareerVisionService(req.body);

    res.status(HTTP_STATUS.CREATED).json(vision);
  } catch (err) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create career vision", error: err });
  }
};

export const updateCareerVision = async (req, res) => {
  try {
    const vision = await updateCareerVisionService(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err) {
    if (err.message === "Career vision not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: err.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to update career vision", error: err });
  }
};

export const deleteCareerVision = async (req, res) => {
  try {
    const result = await deleteCareerVisionService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Career vision not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: err.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete career vision", error: err });
  }
};