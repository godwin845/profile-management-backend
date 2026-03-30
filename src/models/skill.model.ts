import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface ISkill extends Document {
  user: mongoose.Types.ObjectId;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const skillSchema: Schema<ISkill> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// 3. Create the model
const Skill = model<ISkill>("Skill", skillSchema);

export default Skill;