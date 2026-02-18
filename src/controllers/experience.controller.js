import Experience from "../models/experienceModel.js";

// GET ROUTE - Fetch all experience data

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
};


// POST ROUTE - Add experience data

export const addExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const saved = await newExperience.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to add experience" });
  }
};


// PUT ROUTE - Update experience data

export const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update experience" });
  }
};


// DELETE ROUTE - Delete experience data

export const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete experience" });
  }
};