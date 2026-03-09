import Social from "../models/socialModel.js";

// Get all social links
export const getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.json(socials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new social link
export const addSocial = async (req, res) => {
  try {
    const { social, link } = req.body;
    if (!social || !link) {
      return res.status(400).json({ error: "Social and link are required" });
    }

    const newSocial = new Social({ social, link });
    await newSocial.save();
    res.status(201).json(newSocial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a social link
export const updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { social, link } = req.body;

    const updatedSocial = await Social.findByIdAndUpdate(
      id,
      { social, link },
      { new: true, runValidators: true }
    );

    if (!updatedSocial) {
      return res.status(404).json({ error: "Social link not found" });
    }

    res.json(updatedSocial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a social link
export const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Social.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Social link not found" });
    }

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};