import { Request, Response } from "express";
import Profile from "../models/profileModel";

// Get Profile (single)
export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Create Profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, location, bio } = req.body;
    const profileImage = req.files && (req.files as any).profileImage ? (req.files as any).profileImage[0].path : undefined;
    const resume = req.files && (req.files as any).resume ? (req.files as any).resume[0].path : undefined;

    const newProfile = new Profile({ firstName, lastName, email, location, bio, profileImage, resume });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: "Failed to create profile", error: err });
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const { firstName, lastName, location, bio } = req.body;

    const profile = await Profile.findById(profileId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    if (req.files) {
      if ((req.files as any).profileImage) profile.profileImage = (req.files as any).profileImage[0].path;
      if ((req.files as any).resume) profile.resume = (req.files as any).resume[0].path;
    }

    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.location = location;
    profile.bio = bio;

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
};