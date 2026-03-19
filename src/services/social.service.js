import Social from "../models/social.model.js";

// GET current user's social links
export const getSocialService = async (userId) => {
  const socialDoc = await Social.findOne({ user: userId });

  // Empty state: user hasn't created social links yet
  if (!socialDoc) return [];

  return socialDoc.socials ?? [];
};

// CREATE social links (only if none exist)
export const createSocialService = async (socials, userId) => {
  if (!Array.isArray(socials)) {
    throw new Error("Socials must be an array");
  }

  for (const s of socials) {
    if (!s.social || !s.link) {
      throw new Error("Each social entry must have social and link fields");
    }
  }

  const existingDoc = await Social.findOne({ user: userId });
  if (existingDoc) {
    throw new Error("Social links already exist, use update instead");
  }

  const socialDoc = new Social({ user: userId, socials });
  await socialDoc.save();

  return { message: "Social links created successfully", socials };
};

// UPDATE social links (only if they exist)
export const updateSocialService = async (socials, userId) => {
  if (!Array.isArray(socials)) {
    throw new Error("Socials must be an array");
  }

  for (const s of socials) {
    if (!s.social || !s.link) {
      throw new Error("Each social entry must have social and link fields");
    }
  }

  const socialDoc = await Social.findOne({ user: userId });
  if (!socialDoc) {
    throw new Error("Social links not found, create first");
  }

  socialDoc.socials = socials;
  await socialDoc.save();

  return { message: "Social links updated successfully", socials };
};

// DELETE current user's social links
export const deleteSocialService = async (userId) => {
  const socialDoc = await Social.findOneAndDelete({ user: userId });

  if (!socialDoc) {
    throw new Error("Social links not found");
  }

  return { message: "Social links deleted successfully" };
};