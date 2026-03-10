import Profile from "../models/profile.model.js";
import fs from "fs";

export const createOrUpdateProfileService = async (body, files) => {
  const { firstName, lastName, email, location, bio, id } = body;

  const profileData = { firstName, lastName, email, location, bio };

  // handle file uploads
  if (files?.profileImage?.[0]) {
    profileData.profileImage = `/uploads/images/${files.profileImage[0].filename}`;
  }

  if (files?.resumeFile?.[0]) {
    profileData.resumeFile = `/uploads/resumes/${files.resumeFile[0].filename}`;
  }

  let profile;

  if (id) {
    const existingProfile = await Profile.findById(id);

    if (!existingProfile) {
      throw new Error("Profile not found");
    }

    if (!profileData.profileImage)
      profileData.profileImage = existingProfile.profileImage;

    if (!profileData.resumeFile)
      profileData.resumeFile = existingProfile.resumeFile;

    profile = await Profile.findByIdAndUpdate(id, profileData, { new: true });
  } else {
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
  };
};

export const getAllProfilesService = async () => {
  const profiles = await Profile.find();

  return profiles.map((p) => ({
    id: p._id,
    firstName: p.firstName,
    lastName: p.lastName,
    email: p.email,
    location: p.location,
    bio: p.bio,
    profileImage: p.profileImage,
    resumeFile: p.resumeFile,
  }));
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