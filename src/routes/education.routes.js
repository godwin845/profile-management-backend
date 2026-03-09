import express from "express";

import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation
} from "../controllers/education.controller.js";

const router = express.Router();

router.get("/", getEducation);

router.post("/", addEducation);

router.put("/:id", updateEducation);

router.delete("/:id", deleteEducation);

export default router;