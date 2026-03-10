import Education from "../models/education.model.js";

export const getEducationService = async () => {
  return await Education.find().sort({ createdAt: -1 });
};

export const addEducationService = async (data) => {
  const education = new Education(data);
  return await education.save();
};

export const updateEducationService = async (id, data) => {
  const updated = await Education.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    throw new Error("Education not found");
  }

  return updated;
};

export const deleteEducationService = async (id) => {
  const deleted = await Education.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Education not found");
  }

  return { message: "Education deleted successfully" };
};