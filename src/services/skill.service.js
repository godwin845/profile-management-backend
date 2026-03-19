import Skill from "../models/skill.model.js";

// GET current user's skills

export const getSkillsService = async (userId) => {

  const skillDoc = await Skill.findOne({ user: userId });

  // Empty state: user hasn't created skills yet
  if (!skillDoc) return [];

  return skillDoc.skills ?? [];
};

// CREATE new skills (only if none exist)

export const createSkillsService = async (skills, userId) => {
  // Delegate to update logic so "create" and "update"
  // both behave like an upsert.
  return updateSkillsService(skills, userId);
};

// UPDATE existing skills

export const updateSkillsService = async (skills, userId) => {

  if (!Array.isArray(skills)) {
    throw new Error("Skills must be an array");
  }

  const normalizedSkills = [
    ...new Set(
      skills
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean)
    ),
  ];
  let skillDoc = await Skill.findOne({ user: userId });
  if (!skillDoc) {
    // Create new document when none exists yet
    skillDoc = new Skill({ user: userId, skills: normalizedSkills });
  } else {
    skillDoc.skills = normalizedSkills;
  }

  await skillDoc.save();

  return { message: "Skills saved successfully", skills: normalizedSkills };
};

// DELETE current user's skills

export const deleteSkillsService = async (userId) => {

  const skillDoc = await Skill.findOneAndDelete({ user: userId });

  if (!skillDoc) {
    throw new Error("Skills not found");
  }

  return { message: "Skills deleted successfully" };
};