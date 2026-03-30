import Social from "../models/social.model.ts";
import { Types } from "mongoose";

interface SocialEntry {
  social: string;
  link: string;
}

/**
 * Get current user's social links
 * @param userId - MongoDB ObjectId or string
 * @returns Array of social entries
 */
export const getSocialService = async (
  userId: Types.ObjectId | string
): Promise<SocialEntry[]> => {
  const socialDoc = await Social.findOne({ user: userId });
  return socialDoc?.socials ?? [];
};

/**
 * Create social links (only if none exist)
 * @param socials - Array of social entries
 * @param userId - MongoDB ObjectId or string
 * @returns Success message and saved socials
 */
export const createSocialService = async (
  socials: SocialEntry[],
  userId: Types.ObjectId | string
): Promise<{ message: string; socials: SocialEntry[] }> => {
  if (!Array.isArray(socials)) {
    throw new Error("Socials must be an array");
  }

  for (const s of socials) {
    if (!s.social || !s.link) {
      throw new Error("Each social entry must have social and link fields");
    }
  }

  const existingDoc = await Social.findOne({ user: userId });
  if (existingDoc) {
    throw new Error("Social links already exist, use update instead");
  }

  const socialDoc = new Social({ user: userId, socials });
  await socialDoc.save();

  return { message: "Social links created successfully", socials };
};

/**
 * Update social links (only if they exist)
 * @param socials - Array of social entries
 * @param userId - MongoDB ObjectId or string
 * @returns Success message and updated socials
 */
export const updateSocialService = async (
  socials: SocialEntry[],
  userId: Types.ObjectId | string
): Promise<{ message: string; socials: SocialEntry[] }> => {
  if (!Array.isArray(socials)) {
    throw new Error("Socials must be an array");
  }

  for (const s of socials) {
    if (!s.social || !s.link) {
      throw new Error("Each social entry must have social and link fields");
    }
  }

  const socialDoc = await Social.findOne({ user: userId });
  if (!socialDoc) {
    throw new Error("Social links not found, create first");
  }

  socialDoc.socials = socials;
  await socialDoc.save();

  return { message: "Social links updated successfully", socials };
};

/**
 * Delete current user's social links
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteSocialService = async (
  userId: Types.ObjectId | string
): Promise<{ message: string }> => {
  const socialDoc = await Social.findOneAndDelete({ user: userId });

  if (!socialDoc) {
    throw new Error("Social links not found");
  }

  return { message: "Social links deleted successfully" };
};