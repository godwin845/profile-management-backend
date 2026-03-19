import Experience from "../models/experience.model.js";

// GET current user's experience
export const getExperienceService = async (userId) => {
  const experience = await Experience.findOne({ user: userId });
  // Empty state: experience not created yet
  if (!experience) return null;
  return experience;
};

// ADD new experience (only if none exists)
export const addExperienceService = async (data, userId) => {
  const existing = await Experience.findOne({ user: userId });
  if (existing) {
    throw new Error("Experience already exists, use update instead");
  }

  const experience = new Experience({ ...data, user: userId });
  await experience.save();
  return experience;
};

// UPDATE existing experience
export const updateExperienceService = async (data, userId) => {
  const experience = await Experience.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!experience) throw new Error("Experience not found, add first");
  return experience;
};

// DELETE current user's experience
export const deleteExperienceService = async (userId) => {
  const experience = await Experience.findOneAndDelete({ user: userId });
  if (!experience) throw new Error("Experience not found");
  return { message: "Experience deleted successfully" };
};