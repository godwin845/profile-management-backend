import Skill from "../models/skillModel.js";

// GET ROUTE - Fetch all skill data

export const getSkills = async (req, res) => {
  const userId = req.userId;
  try {
    let userSkills = await Skill.findOne({ userId });
    if (!userSkills) {
      return res.json([]);
    }
    res.json(userSkills.skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// POST ROUTE - Create skill data

export const saveSkills = async (req, res) => {
  const userId = req.userId;
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    return res.status(400).json({ message: "Skills must be an array" });
  }

  try {
    const existingSkills = await Skill.findOne({ userId });

    if (existingSkills) {
      return res.status(400).json({ 
        message: "Skills already saved. Update not allowed." 
      });
    }

    const userSkills = new Skill({ userId, skills });
    await userSkills.save();

    res.status(201).json(userSkills.skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};