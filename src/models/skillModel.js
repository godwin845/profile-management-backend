import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", SkillSchema);