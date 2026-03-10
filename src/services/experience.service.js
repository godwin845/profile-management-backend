import Experience from "../models/experience.model.js";

export const getExperiencesService = async () => {
  return await Experience.find();
};

export const createExperienceService = async (data) => {
  const experience = new Experience(data);
  return await experience.save();
};

export const updateExperienceService = async (id, data) => {
  const updated = await Experience.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    throw new Error("Experience not found");
  }

  return updated;
};

export const deleteExperienceService = async (id) => {
  const deleted = await Experience.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Experience not found");
  }

  return { message: "Experience deleted successfully" };
};