import Profile from "../models/profileModel.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, location, bio } = req.body;
    const profileImage = req.files && (req.files).profileImage ? (req.files).profileImage[0].path : undefined;
    const resume = req.files && (req.files).resume ? (req.files).resume[0].path : undefined;

    const newProfile = new Profile({ firstName, lastName, email, location, bio, profileImage, resume });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: "Failed to create profile", error: err });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const { firstName, lastName, location, bio } = req.body;

    const profile = await Profile.findById(profileId);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    if (req.files) {
      if ((req.files).profileImage) profile.profileImage = (req.files).profileImage[0].path;
      if ((req.files).resume) profile.resume = (req.files).resume[0].path;
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