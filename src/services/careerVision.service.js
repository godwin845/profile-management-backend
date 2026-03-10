import CareerVision from "../models/careerVision.model.js";

export const getCareerVisionService = async () => {
  return await CareerVision.findOne();
};

export const createCareerVisionService = async (data) => {
  const vision = new CareerVision(data);
  return await vision.save();
};

export const updateCareerVisionService = async (id, data) => {
  const vision = await CareerVision.findByIdAndUpdate(id, data, { new: true });

  if (!vision) {
    throw new Error("Career vision not found");
  }

  return vision;
};

export const deleteCareerVisionService = async (id) => {
  const vision = await CareerVision.findByIdAndDelete(id);

  if (!vision) {
    throw new Error("Career vision not found");
  }

  return { message: "Career vision deleted successfully" };
};