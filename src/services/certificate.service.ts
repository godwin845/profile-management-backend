import Certificate, { type ICertificate } from "../models/certification.model.ts";
import { Types } from "mongoose";

/**
 * Get the current user's certificate
 * @param userId - MongoDB ObjectId or string
 * @returns Certificate document or null
 */
export const getCertificateService = async (
  userId: Types.ObjectId | string
): Promise<ICertificate | null> => {
  const certificate = await Certificate.findOne({ user: userId });
  return certificate || null;
};

/**
 * Add new certificate (only if none exists)
 * @param data - Certificate data
 * @param userId - MongoDB ObjectId or string
 * @returns Created Certificate document
 */
export const addCertificateService = async (
  data: Partial<ICertificate>,
  userId: Types.ObjectId | string
): Promise<ICertificate> => {
  const existing = await Certificate.findOne({ user: userId });
  if (existing) {
    throw new Error("Certificate already exists, use update instead");
  }

  const certificate = new Certificate({ ...data, user: userId });
  await certificate.save();
  return certificate;
};

/**
 * Update existing certificate
 * @param data - Partial certificate data to update
 * @param userId - MongoDB ObjectId or string
 * @returns Updated Certificate document
 */
export const updateCertificateService = async (
  data: Partial<ICertificate>,
  userId: Types.ObjectId | string
): Promise<ICertificate> => {
  const certificate = await Certificate.findOneAndUpdate({ user: userId }, data, { new: true });
  if (!certificate) throw new Error("Certificate not found, add first");
  return certificate;
};

/**
 * Delete current user's certificate
 * @param userId - MongoDB ObjectId or string
 * @returns Success message
 */
export const deleteCertificateService = async (
  userId: Types.ObjectId | string
): Promise<{ message: string }> => {
  const certificate = await Certificate.findOneAndDelete({ user: userId });
  if (!certificate) throw new Error("Certificate not found");
  return { message: "Certificate deleted successfully" };
};