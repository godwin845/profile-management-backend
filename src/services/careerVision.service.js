import CareerVision from "../models/careerVision.model.js";

// Get the current user's career vision
export const getCareerVisionService = async (userId) => {
  const vision = await CareerVision.findOne({ user: userId });
  // Empty state: career vision not created yet
  if (!vision) return null;
  return vision;
};

// CREATE new career vision
export const createCareerVisionService = async (data, userId) => {
  // Prevent creating duplicate visions
  const existingVision = await CareerVision.findOne({ user: userId });
  if (existingVision) throw new Error("Career vision already exists");

  const vision = new CareerVision({ ...data, user: userId });
  await vision.save();
  return vision;
};

// UPDATE existing career vision
export const updateCareerVisionService = async (data, userId) => {
  const vision = await CareerVision.findOneAndUpdate({ user: userId }, data, { new: true });

  if (!vision) throw new Error("Career vision not found");
  return vision;
};

// DELETE current user's career vision
export const deleteCareerVisionService = async (userId) => {
  const vision = await CareerVision.findOneAndDelete({ user: userId });
  if (!vision) throw new Error("Career vision not found");
  return { message: "Career vision deleted successfully" };
};