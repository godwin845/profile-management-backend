import Certificate from "../models/certification.model.js";

// GET current user's certificate
export const getCertificateService = async (userId) => {
  const certificate = await Certificate.findOne({ user: userId });
  // Empty state: certificate not created yet
  if (!certificate) return null;
  return certificate;
};

// ADD new certificate (only if none exists)
export const addCertificateService = async (data, userId) => {
  const existing = await Certificate.findOne({ user: userId });
  if (existing) {
    throw new Error("Certificate already exists, use update instead");
  }

  const certificate = new Certificate({ ...data, user: userId });
  await certificate.save();
  return certificate;
};

// UPDATE existing certificate
export const updateCertificateService = async (data, userId) => {
  const certificate = await Certificate.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!certificate) throw new Error("Certificate not found, add first");
  return certificate;
};

// DELETE current user's certificate
export const deleteCertificateService = async (userId) => {
  const certificate = await Certificate.findOneAndDelete({ user: userId });
  if (!certificate) throw new Error("Certificate not found");
  return { message: "Certificate deleted successfully" };
};