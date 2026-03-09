import Profile from "../models/profileModel.js";
import fs from "fs";

// CREATE OR UPDATE PROFILE
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, location, bio, id } = req.body;

    // Build profile data
    const profileData = { firstName, lastName, email, location, bio };

    // Handle optional file uploads
    if (req.files?.profileImage?.[0]) {
      profileData.profileImage = `/uploads/images/${req.files.profileImage[0].filename}`;
    }

    if (req.files?.resumeFile?.[0]) {
      profileData.resumeFile = `/uploads/resumes/${req.files.resumeFile[0].filename}`;
    }
    let profile;

    if (id) {
      // Find existing profile
      const existingProfile = await Profile.findById(id);
      if (!existingProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      // Preserve existing files if no new file uploaded
      if (!profileData.profileImage) profileData.profileImage = existingProfile.profileImage;
      if (!profileData.resumeFile) profileData.resumeFile = existingProfile.resumeFile;

      // Update profile
      profile = await Profile.findByIdAndUpdate(id, profileData, { new: true });
    } else {
      // Create new profile
      profile = new Profile(profileData);
      await profile.save();
    }

    res.json({
      id: profile._id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      location: profile.location,
      bio: profile.bio,
      profileImage: profile.profileImage,
      resumeFile: profile.resumeFile,
    });
  } catch (err) {
    console.error("Error in createOrUpdateProfile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET ALL PROFILES
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    const formatted = profiles.map((p) => ({
      id: p._id,
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      location: p.location,
      bio: p.bio,
      profileImage: p.profileImage,
      resumeFile: p.resumeFile,
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error in getAllProfiles:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE PROFILE
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    // Optional: remove files from server if they exist
    if (profile.profileImage && fs.existsSync(profile.profileImage)) {
      fs.unlinkSync(profile.profileImage);
    }
    if (profile.resumeFile && fs.existsSync(profile.resumeFile)) {
      fs.unlinkSync(profile.resumeFile);
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    console.error("Error in deleteProfile:", err);
    res.status(500).json({ error: "Server error" });
  }
};