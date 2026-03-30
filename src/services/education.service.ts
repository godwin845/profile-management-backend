import Education, { type IEducation } from "../models/education.model.ts";
import { Types } from "mongoose";

/**
 * Get the current user's education
 * @param userId - MongoDB ObjectId or string
 * @returns Education document or null
 */
export const getEducationService = async (
  userId: Types.ObjectId | string
): Promise<IEducation | null> => {
  const education = await Education.findOne({ user: userId });
  return education || null;
};

/**
 * Create new education (only if none exists)
 * @param data - Education data
 * @param userId - MongoDB ObjectId or string
 * @returns Created Education document
 */
export const createEducationService = async (
  data: Partial<IEducation>,
  userId: Types.ObjectId | string
): Promise<IEducation> => {
  const existing = await Education.findOne({ user: userId });
  if (existing) {
    throw new Error("Education already exists, use update instead");
  }

  const education = new Education({ ...data, user: userId });
  await education.save();
  return education;
};

/**
 * Update existing education
 * @param data - Partial education data to update
 * @param userId - MongoDB ObjectId or string
 * @returns Updated Education document
 */
export const updateEducationService = async (
id: string, data: Partial<IEducation>, userId: Types.ObjectId | string): Promise<IEducation> => {
  const education = await Education.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!education) throw new Error("Education not found, create first");
  return education;
};

/**
 * Delete current user's education
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteEducationService = async (
userId: Types.ObjectId | string): Promise<{ message: string }> => {
  const education = await Education.findOneAndDelete({ user: userId });
  if (!education) throw new Error("Education not found");
  return { message: "Education deleted successfully" };
};