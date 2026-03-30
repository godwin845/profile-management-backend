import type { RequestHandler } from "express";
import {
  getCertificateService,
  addCertificateService,
  updateCertificateService,
  deleteCertificateService,
} from "../services/certificate.service.ts";
import { HTTP_STATUS } from "../constants/httpStatus.ts";
import type { ICertificate } from "../models/certification.model.ts";

/**
 * Extend Express Request type to include authenticated user
 */
interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}

/**
 * GET current user's certificate
 */
export const getCertificate: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const certificate = await getCertificateService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(certificate);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Server Error", details: errorMessage });
  }
};

/**
 * ADD certificate
 */
export const addCertificate: RequestHandler<object, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const certificate = await addCertificateService(req.body as Partial<ICertificate>, userReq.user._id);
    res.status(HTTP_STATUS.CREATED).json(certificate);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Certificate already exists, use update instead") {
      return res.status(HTTP_STATUS.CONFLICT).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to add certificate",
      details: errorMessage,
    });
  }
};

/**
 * UPDATE certificate
 */
export const updateCertificate: RequestHandler<object, unknown, unknown, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const certificate = await updateCertificateService(req.body as Partial<ICertificate>, userReq.user._id);
    res.status(HTTP_STATUS.OK).json(certificate);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Certificate not found, add first") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to update certificate",
      details: errorMessage,
    });
  }
};

/**
 * DELETE certificate
 */
export const deleteCertificate: RequestHandler<object, unknown, object, object> = async (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  try {
    const result = await deleteCertificateService(userReq.user._id);
    res.status(HTTP_STATUS.OK).json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    if (errorMessage === "Certificate not found") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: errorMessage });
    }
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to delete certificate",
      details: errorMessage,
    });
  }
};