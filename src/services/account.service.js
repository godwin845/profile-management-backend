import DeleteRequest from "../models/DeleteRequest.model.js";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Social from "../models/social.model.js";
import Skill from "../models/skill.model.js";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Certificate from "../models/certification.model.js";
import CareerVision from "../models/careerVision.model.js";

export const deleteAccountService = async (userId, reason) => {
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
    Profile.deleteMany({}),
    Social.deleteMany({}),
    Skill.deleteMany({}),
    Education.deleteMany({}),
    Experience.deleteMany({}),
    Certificate.deleteMany({}),
    CareerVision.deleteMany({}),
    DeleteRequest.deleteMany({ user: userId }),
  ]);

  // Delete user
  await User.findByIdAndDelete(userId);

  return {
    message: "Account and associated data deleted successfully",
  };
};