import {
  getCertificatesService,
  createCertificateService,
  updateCertificateService,
  deleteCertificateService
} from "../services/certificate.service.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

// GET all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await getCertificatesService();

    res.status(HTTP_STATUS.OK).json(certificates);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// CREATE certificate
export const createCertificate = async (req, res) => {
  try {
    const certificate = await createCertificateService(req.body);

    res.status(HTTP_STATUS.CREATED).json(certificate);
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// UPDATE certificate
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await updateCertificateService(
      req.params.id,
      req.body
    );

    res.status(HTTP_STATUS.OK).json(certificate);
  } catch (error) {
    if (error.message === "Certificate not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// DELETE certificate
export const deleteCertificate = async (req, res) => {
  try {
    const result = await deleteCertificateService(req.params.id);

    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    if (error.message === "Certificate not found") {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: error.message });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};