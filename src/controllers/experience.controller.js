import Experience from "../models/experienceModel.js";


// GET all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// CREATE experience
export const createExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const saved = await newExperience.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE experience
export const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE experience
export const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};