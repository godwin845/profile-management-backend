import Experience, { type IExperience } from "../models/experience.model.ts";
import { Types } from "mongoose";

/**
 * Get the current user's experience
 * @param userId - MongoDB ObjectId or string
 * @returns Experience document or null
 */
export const getExperienceService = async (
  userId: Types.ObjectId | string
): Promise<IExperience | null> => {
  const experience = await Experience.findOne({ user: userId });
  return experience || null;
};

/**
 * Add new experience (only if none exists)
 * @param data - Experience data
 * @param userId - MongoDB ObjectId or string
 * @returns Created Experience document
 */
export const addExperienceService = async (
  data: Partial<IExperience>,
  userId: Types.ObjectId | string
): Promise<IExperience> => {
  const existing = await Experience.findOne({ user: userId });
  if (existing) {
    throw new Error("Experience already exists, use update instead");
  }

  const experience = new Experience({ ...data, user: userId });
  await experience.save();
  return experience;
};

/**
 * Update existing experience
 * @param data - Partial experience data to update
 * @param userId - MongoDB ObjectId or string
 * @returns Updated Experience document
 */
export const updateExperienceService = async (
id: string, data: Partial<IExperience>, userId: Types.ObjectId | string): Promise<IExperience> => {
  const experience = await Experience.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!experience) throw new Error("Experience not found, add first");
  return experience;
};

/**
 * Delete current user's experience
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteExperienceService = async (
userId: Types.ObjectId | string): Promise<{ message: string }> => {
  const experience = await Experience.findOneAndDelete({ user: userId });
  if (!experience) throw new Error("Experience not found");
  return { message: "Experience deleted successfully" };
};