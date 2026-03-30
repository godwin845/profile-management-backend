import Profile, { type IProfile } from "../models/profile.model.ts";
import fs from "fs";
import { Types } from "mongoose";

interface ProfileBody {
  firstName: string;
  lastName: string;
  email: string;
  location?: string;
  bio?: string;
}

interface FileUpload {
  filename: string;
}

interface UploadedFiles {
  profileImage?: FileUpload[];
  resumeFile?: FileUpload[];
}

/**
 * Create or update a user profile
 * @param body - Profile data
 * @param files - Uploaded files
 * @param userId - MongoDB ObjectId or string
 * @returns Profile info
 */
export const createOrUpdateProfileService = async (
  body: ProfileBody,
  files: UploadedFiles,
  userId: Types.ObjectId | string
) => {
  const { firstName, lastName, email, location, bio } = body;

  const profileData: Partial<IProfile> & { user: Types.ObjectId } = {
    firstName,
    lastName,
    email,
    location: location ?? undefined,
    bio: bio ?? undefined,
    user: new Types.ObjectId(userId),
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
    if (!profileData.profileImage && profile.profileImage) profileData.profileImage = profile.profileImage;
    if (!profileData.resumeFile && profile.resumeFile) profileData.resumeFile = profile.resumeFile;

    // update the existing profile
    profile = await Profile.findByIdAndUpdate(profile._id, profileData, { new: true });
  } else {
    // create new profile
    profile = new Profile(profileData);
    await profile.save();
  }

  if (!profile) {
    throw new Error("Profile could not be created or updated");
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

/**
 * Get the current user's profile
 * @param userId - MongoDB ObjectId or string
 * @returns Profile info or null
 */
export const getProfileService = async (
  userId: Types.ObjectId | string
) => {
  const profile = await Profile.findOne({ user: userId });

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

/**
 * Delete a profile by ID
 * @param id - Profile ID
 * @returns Success message
 */
export const deleteProfileService = async (id: Types.ObjectId | string) => {
  const profile = await Profile.findById(id);

  if (!profile) {
    throw new Error("Profile not found");
  }

  // Remove uploaded files if they exist
  if (profile.profileImage && fs.existsSync(profile.profileImage)) {
    fs.unlinkSync(profile.profileImage);
  }

  if (profile.resumeFile && fs.existsSync(profile.resumeFile)) {
    fs.unlinkSync(profile.resumeFile);
  }

  await Profile.findByIdAndDelete(id);

  return { message: "Profile deleted successfully" };
};