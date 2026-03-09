import Certificate from "../models/certificationModel.js";

// GET all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE certificate
export const createCertificate = async (req, res) => {
  try {
    const newCertificate = new Certificate(req.body);
    const saved = await newCertificate.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE certificate
export const updateCertificate = async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE certificate
export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};