import DeleteRequest from "../models/DeleteRequest.model.ts";
import User from "../models/user.model.ts";
import Profile from "../models/profile.model.ts";
import Social from "../models/social.model.ts";
import Skill from "../models/skill.model.ts";
import Education from "../models/education.model.ts";
import Experience from "../models/experience.model.ts";
import Certificate from "../models/certification.model.ts";
import CareerVision from "../models/careerVision.model.ts";
import { Types } from "mongoose";

/**
 * Deletes a user account and all associated data
 * @param userId - MongoDB ObjectId of the user
 * @param reason - Reason for account deletion
 */
export const deleteAccountService = async (
  userId: Types.ObjectId | string,
  reason: string
): Promise<{ message: string }> => {
  if (!reason || !reason.trim()) {
    throw new Error("Reason is required");
  }

  const trimmedReason = reason.trim();

  // Record delete request for audit
  await DeleteRequest.create({
    user: userId,
    reason: trimmedReason,
  });

  // Remove all associated data for this account
  await Promise.all([
    Profile.deleteMany({ user: userId }),
    Social.deleteMany({ user: userId }),
    Skill.deleteMany({ user: userId }),
    Education.deleteMany({ user: userId }),
    Experience.deleteMany({ user: userId }),
    Certificate.deleteMany({ user: userId }),
    CareerVision.deleteMany({ user: userId }),
    DeleteRequest.deleteMany({ user: userId }),
  ]);

  // Delete user
  await User.findByIdAndDelete(userId);

  return {
    message: "Account and associated data deleted successfully",
  };
};