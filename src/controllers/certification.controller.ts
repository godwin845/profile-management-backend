import { Request, Response } from "express";
import { certifications, Certification } from "../data/profileData";

export const getCertifications = (req: Request, res: Response) => {
  res.json(certifications);
};

export const addCertification = (req: Request, res: Response) => {
  const newCert: Certification = req.body;
  certifications.push(newCert);
  res.status(201).json(newCert);
};

export const updateCertification = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (certifications[index]) {
    certifications[index] = req.body;
    return res.json(certifications[index]);
  }
  res.status(404).json({ message: "Certification not found" });
};

export const deleteCertification = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (certifications[index]) {
    const removed = certifications.splice(index, 1);
    return res.json(removed[0]);
  }
  res.status(404).json({ message: "Certification not found" });
};