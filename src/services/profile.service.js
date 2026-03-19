import Profile from "../models/profile.model.js";
import fs from "fs";

export const createOrUpdateProfileService = async (body, files, userId) => {
  const { firstName, lastName, email, location, bio } = body;

  const profileData = {
    firstName,
    lastName,
    email,
    location,
    bio,
    user: userId, // associate profile with the user
  };

  // handle file uploads
  if (files?.profileImage?.[0]) {
    profileData.profileImage = `/uploads/images/${files.profileImage[0].filename}`;
  }

  if (files?.resumeFile?.[0]) {
    profileData.resumeFile = `/uploads/resumes/${files.resumeFile[0].filename}`;
  }

  // Check if profile already exists for this user
  let profile = await Profile.findOne({ user: userId });

  if (profile) {
    // preserve existing files if not replaced
    if (!profileData.profileImage) profileData.profileImage = profile.profileImage;
    if (!profileData.resumeFile) profileData.resumeFile = profile.resumeFile;

    // update the existing profile
    profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true });
  } else {
    // create new profile
    profile = new Profile(profileData);
    await profile.save();
  }

  return {
    id: profile._id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    location: profile.location,
    bio: profile.bio,
    profileImage: profile.profileImage,
    resumeFile: profile.resumeFile,
    user: profile.user,
  };
};

export const getProfileService = async (userId) => {
  const profile = await Profile.findOne({ user: userId });

  // Empty state: profile not created yet
  if (!profile) return null;

  return {
    id: profile._id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    location: profile.location,
    bio: profile.bio,
    profileImage: profile.profileImage,
    resumeFile: profile.resumeFile,
    user: profile.user,
  };
};

export const deleteProfileService = async (id) => {
  const profile = await Profile.findById(id);

  if (!profile) {
    throw new Error("Profile not found");
  }

  if (profile.profileImage && fs.existsSync(profile.profileImage)) {
    fs.unlinkSync(profile.profileImage);
  }

  if (profile.resumeFile && fs.existsSync(profile.resumeFile)) {
    fs.unlinkSync(profile.resumeFile);
  }

  await Profile.findByIdAndDelete(id);

  return { message: "Profile deleted successfully" };
};