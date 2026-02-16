import { Request, Response } from "express";
import { experiences, Experience } from "../data/profileData";

export const getExperiences = (req: Request, res: Response) => {
  res.json(experiences);
};

export const addExperience = (req: Request, res: Response) => {
  const newExp: Experience = req.body;
  experiences.push(newExp);
  res.status(201).json(newExp);
};

export const updateExperience = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (experiences[index]) {
    experiences[index] = req.body;
    return res.json(experiences[index]);
  }
  res.status(404).json({ message: "Experience not found" });
};

export const deleteExperience = (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (experiences[index]) {
    const removed = experiences.splice(index, 1);
    return res.json(removed[0]);
  }
  res.status(404).json({ message: "Experience not found" });
};