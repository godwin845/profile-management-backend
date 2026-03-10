import DeleteRequest from "../models/DeleteRequest.model.js";
import User from "../models/user.model.js";

export const deleteAccountService = async (userId, reason) => {
  if (!reason || !reason.trim()) {
    throw new Error("Reason is required");
  }

  // Create delete request
  await DeleteRequest.create({
    user: userId,
    reason: reason.trim(),
  });

  // Delete user
  await User.findByIdAndDelete(userId);

  return {
    message: "Account deletion request submitted successfully",
  };
};