import {
  getCareerVisionService,
  createCareerVisionService,
  updateCareerVisionService,
  deleteCareerVisionService,
} from "../services/careerVision.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's career vision
export const getCareerVision = async (req, res) => {
  try {
    const vision = await getCareerVisionService(req.user._id);
    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// CREATE career vision
export const createCareerVision = async (req, res) => {
  try {
    const vision = await createCareerVisionService(req.body, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(vision);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create career vision",
      details: err.message,
    });
  }
};

// UPDATE career vision
export const updateCareerVision = async (req, res) => {
  try {
    const vision = await updateCareerVisionService(req.body, req.user._id);
    res.status(HTTP_STATUS.OK).json(vision);
  } catch (err) {
    if (err.message === "Career vision not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update career vision",
      details: err.message,
    });
  }
};

// DELETE current user's career vision
export const deleteCareerVision = async (req, res) => {
  try {
    const result = await deleteCareerVisionService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Career vision not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete career vision",
      details: err.message,
    });
  }
};