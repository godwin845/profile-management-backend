import CareerVision, { type ICareerVision } from "../models/careerVision.model.ts";
import { Types } from "mongoose";

/**
 * Get the current user's career vision
 * @param userId - MongoDB ObjectId or string
 * @returns CareerVision document or null
 */
export const getCareerVisionService = async (
  userId: Types.ObjectId | string
): Promise<ICareerVision | null> => {
  const vision = await CareerVision.findOne({ user: userId });
  return vision || null;
};

/**
 * Create a new career vision
 * @param data - Career vision data
 * @param userId - MongoDB ObjectId or string
 * @returns Created CareerVision document
 */
export const createCareerVisionService = async (
  data: Partial<ICareerVision>,
  userId: Types.ObjectId | string
): Promise<ICareerVision> => {
  const existingVision = await CareerVision.findOne({ user: userId });
  if (existingVision) throw new Error("Career vision already exists");

  const vision = new CareerVision({ ...data, user: userId });
  await vision.save();
  return vision;
};

/**
 * Update existing career vision
 * @param data - Partial data to update
 * @param userId - MongoDB ObjectId or string
 * @returns Updated CareerVision document
 */
export const updateCareerVisionService = async (
  data: Partial<ICareerVision>,
  userId: Types.ObjectId | string
): Promise<ICareerVision> => {
  const vision = await CareerVision.findOneAndUpdate({ user: userId }, data, { new: true });

  if (!vision) throw new Error("Career vision not found");
  return vision;
};

/**
 * Delete current user's career vision
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteCareerVisionService = async (
  userId: Types.ObjectId | string
): Promise<{ message: string }> => {
  const vision = await CareerVision.findOneAndDelete({ user: userId });
  if (!vision) throw new Error("Career vision not found");
  return { message: "Career vision deleted successfully" };
};