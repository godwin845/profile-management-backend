import Certificate from "../models/certification.model.js";

export const getCertificatesService = async () => {
  return await Certificate.find();
};

export const createCertificateService = async (data) => {
  const certificate = new Certificate(data);
  return await certificate.save();
};

export const updateCertificateService = async (id, data) => {
  const updated = await Certificate.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updated) {
    throw new Error("Certificate not found");
  }

  return updated;
};

export const deleteCertificateService = async (id) => {
  const deleted = await Certificate.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Certificate not found");
  }

  return { message: "Certificate deleted successfully" };
};