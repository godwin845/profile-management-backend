import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IExperience extends Document {
  user: mongoose.Types.ObjectId;
  role: string;
  company: string;
  location?: string;
  doj: string;
  doe?: string;
  present: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const experienceSchema: Schema<IExperience> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    doj: {
      type: String,
      required: true,
    },
    doe: {
      type: String,
    },
    present: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 3. Create the model
const Experience = model<IExperience>("Experience", experienceSchema);

export default Experience;