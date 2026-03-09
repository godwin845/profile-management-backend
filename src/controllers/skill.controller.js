import Skill from "../models/skillModel.js";

// GET all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills.map(s => s.name));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch skills" });
  }
};

// POST skills (replace all)
export const saveSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    // Remove existing skills and insert new ones
    await Skill.deleteMany({});
    const skillDocs = skills.map(name => ({ name }));
    await Skill.insertMany(skillDocs);

    res.json({ message: "Skills updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save skills" });
  }
};

// DELETE a skill by name
export const deleteSkill = async (req, res) => {
  try {
    const { skillName } = req.params;
    await Skill.findOneAndDelete({ name: skillName });
    res.json({ message: `Skill "${skillName}" deleted` });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete skill" });
  }
};