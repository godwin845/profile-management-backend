import Skill from "../models/skill.model.js";

export const getSkillsService = async () => {
  const skills = await Skill.find().sort({ name: 1 });
  return skills.map((s) => s.name);
};

export const saveSkillsService = async (skills) => {
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

  const operations = normalizedSkills.map((name) => ({
    updateOne: {
      filter: { name },
      update: { $set: { name } },
      upsert: true,
    },
  }));

  await Skill.bulkWrite(operations);

  return { message: "Skills updated successfully" };
};

export const deleteSkillService = async (skillName) => {
  const deleted = await Skill.findOneAndDelete({ name: skillName });

  if (!deleted) {
    throw new Error("Skill not found");
  }

  return { message: `Skill "${skillName}" deleted successfully` };
};