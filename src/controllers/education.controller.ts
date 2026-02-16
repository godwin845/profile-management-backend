import { Request, Response } from "express";
import { educations, Education } from "../data/profileData";

export const getEducations = (req: Request, res: Response) => {
  res.json(educations);
};

export const addEducation = (req: Request, res: Response) => {
  const newEdu: Education = req.body;
  educations.push(newEdu);
  res.status(201).json(newEdu);
};

export const updateEducation = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (educations[index]) {
    educations[index] = req.body;
    return res.json(educations[index]);
  }
  res.status(404).json({ message: "Education not found" });
};

export const deleteEducation = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (educations[index]) {
    const removed = educations.splice(index, 1);
    return res.json(removed[0]);
  }
  res.status(404).json({ message: "Education not found" });
};