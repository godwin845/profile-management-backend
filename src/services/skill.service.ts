import Skill from "../models/skill.model.ts";
import { Types } from "mongoose";

/**
 * Get current user's skills
 * @param userId - MongoDB ObjectId or string
 * @returns Array of skills (strings)
 */
export const getSkillsService = async (
  userId: Types.ObjectId | string
): Promise<string[]> => {
  const skillDoc = await Skill.findOne({ user: userId });
  return skillDoc?.skills ?? [];
};

/**
 * Create new skills (upsert behavior)
 * @param skills - Array of skill strings
 * @param userId - MongoDB ObjectId or string
 * @returns Success message and saved skills
 */
export const createSkillsService = async (
  skills: string[],
  userId: Types.ObjectId | string
): Promise<{ message: string; skills: string[] }> => {
  return updateSkillsService(skills, userId);
};

/**
 * Update existing skills
 * @param skills - Array of skill strings
 * @param userId - MongoDB ObjectId or string
 * @returns Success message and saved skills
 */
export const updateSkillsService = async (
  skills: string[],
  userId: Types.ObjectId | string
): Promise<{ message: string; skills: string[] }> => {
  if (!Array.isArray(skills)) {
    throw new Error("Skills must be an array");
  }

  const normalizedSkills = [
    ...new Set(
      skills
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean)
    ),
  ];

  let skillDoc = await Skill.findOne({ user: userId });

  if (!skillDoc) {
    // Create new document if none exists
    skillDoc = new Skill({ user: userId, skills: normalizedSkills });
  } else {
    skillDoc.skills = normalizedSkills;
  }

  await skillDoc.save();

  return { message: "Skills saved successfully", skills: normalizedSkills };
};

/**
 * Delete current user's skills
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteSkillsService = async (
  userId: Types.ObjectId | string
): Promise<{ message: string }> => {
  const skillDoc = await Skill.findOneAndDelete({ user: userId });

  if (!skillDoc) {
    throw new Error("Skills not found");
  }

  return { message: "Skills deleted successfully" };
};