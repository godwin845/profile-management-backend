import mongoose, { Schema, Document, model } from "mongoose";

// Interface for TypeScript
export interface ISkill extends Document {
  userId: string;
  skills: string[];
}

// Mongoose schema
const SkillSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model<ISkill>("Skill", SkillSchema);