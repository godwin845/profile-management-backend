import Social from "../models/social.model.js";

export const getAllSocialsService = async () => {
  return await Social.find();
};

export const addSocialService = async (data) => {
  const { social, link } = data;

  if (!social || !link) {
    throw new Error("Social and link are required");
  }

  const newSocial = new Social({ social, link });

  return await newSocial.save();
};

export const updateSocialService = async (id, data) => {
  const { social, link } = data;

  const updated = await Social.findByIdAndUpdate(
    id,
    { social, link },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error("Social link not found");
  }

  return updated;
};

export const deleteSocialService = async (id) => {
  const deleted = await Social.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Social link not found");
  }

  return { message: "Social link deleted successfully" };
};