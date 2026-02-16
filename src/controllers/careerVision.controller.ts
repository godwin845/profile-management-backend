import { Request, Response } from "express";
import CareerVision from "../models/careerVision";

export const getCareerVision = async (req: Request, res: Response) => {
  try {
    const vision = await CareerVision.findOne();
    res.json(vision);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const createCareerVision = async (req: Request, res: Response) => {
  try {
    const vision = new CareerVision(req.body);
    await vision.save();
    res.status(201).json(vision);
  } catch (err) {
    res.status(500).json({ message: "Failed to create career vision", error: err });
  }
};

export const updateCareerVision = async (req: Request, res: Response) => {
  try {
    const vision = await CareerVision.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vision) return res.status(404).json({ message: "Career vision not found" });
    res.json(vision);
  } catch (err) {
    res.status(500).json({ message: "Failed to update career vision", error: err });
  }
};