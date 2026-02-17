import DeleteRequest from "../models/DeleteRequestModel.js";
import User from "../models/userModel.js";

export const deleteAccount = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason || !reason.trim()) {
      return res.status(400).json({ message: "Reason is required" });
    }

    // Save deletion request
    await DeleteRequest.create({
      user: req.user,
      reason: reason.trim(),
    });

    // OPTIONAL: Immediately delete user account
    await User.findByIdAndDelete(req.user);

    res.json({
      message: "Account deletion request submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to process account deletion",
    });
  }
};