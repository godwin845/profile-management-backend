import Education from "../models/educationModel.js";

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });

    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addEducation = async (req, res) => {
  try {
    const newEdu = new Education(req.body);

    const saved = await newEdu.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);

    res.json({ message: "Education deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};