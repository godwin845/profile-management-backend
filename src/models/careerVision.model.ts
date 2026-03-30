import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface ICareerVision extends Document {
  user: mongoose.Types.ObjectId;
  category: string;
  field?: string;
  longTerm: string;
  shortTerm: string;
  inspiration?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const careerVisionSchema: Schema<ICareerVision> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    category: { type: String, required: true },
    field: { type: String },
    longTerm: { type: String, required: true },
    shortTerm: { type: String, required: true },
    inspiration: { type: String },
  },
  { timestamps: true }
);

// 3. Create the model
const CareerVision = model<ICareerVision>("CareerVision", careerVisionSchema);

export default CareerVision;