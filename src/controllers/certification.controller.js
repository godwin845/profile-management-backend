import Certification from "../models/certificationModel.js";

// GET ROUTE - Fetch all certifications

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certifications" });
  }
};


// POST ROUTE - Create certification

export const addCertification = async (req, res) => {
  try {
    const newCertification = new Certification(req.body);
    const saved = await newCertification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to add certification" });
  }
};


// PUT ROUTE - Update certification

export const updateCertification = async (req, res) => {
  try {
    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Certification not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update certification" });
  }
};


// DELETE ROUTE - Delete certification

export const deleteCertification = async (req, res) => {
  try {
    const deleted = await Certification.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Certification not found" });
    }

    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete certification" });
  }
};