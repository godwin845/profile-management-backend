import Education from "../models/education.model.js";

// GET current user's education
export const getEducationService = async (userId) => {
  const education = await Education.findOne({ user: userId });
  // Empty state: education not created yet
  if (!education) return null;
  return education;
};

// CREATE new education (only if none exists)
export const createEducationService = async (data, userId) => {
  const existing = await Education.findOne({ user: userId });
  if (existing) {
    throw new Error("Education already exists, use update instead");
  }

  const education = new Education({ ...data, user: userId });
  await education.save();
  return education;
};

// UPDATE existing education
export const updateEducationService = async (data, userId) => {
  const education = await Education.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!education) throw new Error("Education not found, create first");
  return education;
};

// DELETE current user's education
export const deleteEducationService = async (userId) => {
  const education = await Education.findOneAndDelete({ user: userId });
  if (!education) throw new Error("Education not found");
  return { message: "Education deleted successfully" };
};