import Education from "../models/educationModel.js";

// GET ROUTE - Fetch all education data

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch educations" });
  }
};


// POST ROUTE - Create education data

export const addEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const saved = await newEducation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to add education" });
  }
};


// PUT ROUTE - Update education data

export const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update education" });
  }
};


// DELETE ROUTE - Delete education data

export const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete education" });
  }
};