import {
  getCertificateService,
  addCertificateService,
  updateCertificateService,
  deleteCertificateService,
} from "../services/certificate.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET current user's certificate
export const getCertificate = async (req, res) => {
  try {
    const certificate = await getCertificateService(req.user._id);
    res.status(HTTP_STATUS.OK).json(certificate);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error" });
  }
};

// ADD certificate
export const addCertificate = async (req, res) => {
  try {
    const certificate = await addCertificateService(req.body, req.user._id);
    res.status(HTTP_STATUS.CREATED).json(certificate);
  } catch (err) {
    if (err.message === "Certificate already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to add certificate",
      details: err.message,
    });
  }
};

// UPDATE certificate
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await updateCertificateService(req.body, req.user._id);
    res.status(HTTP_STATUS.OK).json(certificate);
  } catch (err) {
    if (err.message === "Certificate not found, add first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update certificate",
      details: err.message,
    });
  }
};

// DELETE certificate
export const deleteCertificate = async (req, res) => {
  try {
    const result = await deleteCertificateService(req.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err) {
    if (err.message === "Certificate not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete certificate",
      details: err.message,
    });
  }
};