import Skill from "../models/skill.model.js";

export const getSkillsService = async () => {
  const skills = await Skill.find().sort({ name: 1 });
  return skills.map((s) => s.name);
};

export const saveSkillsService = async (skills) => {
  if (!Array.isArray(skills)) {
    throw new Error("Skills must be an array");
  }

  // Normalize incoming skills: keep only non-empty strings, trim, and de-duplicate
  const normalizedSkills = [
    ...new Set(
      skills
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter(Boolean)
    ),
  ];

  // Clear existing skills before inserting updated list
  await Skill.deleteMany({});

  if (normalizedSkills.length === 0) {
    return { message: "No skills to save" };
  }

  const skillDocs = normalizedSkills.map((name) => ({ name }));

  await Skill.insertMany(skillDocs);

  return { message: "Skills updated successfully" };
};

export const deleteSkillService = async (skillName) => {
  const deleted = await Skill.findOneAndDelete({ name: skillName });

  if (!deleted) {
    throw new Error("Skill not found");
  }

  return { message: `Skill "${skillName}" deleted successfully` };
};