import mongoose from "mongoose";

const careerVisionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    
    category: { type: String, required: true },
    field: { type: String },
    longTerm: { type: String, required: true },
    shortTerm: { type: String, required: true },
    inspiration: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model("CareerVision", careerVisionSchema);