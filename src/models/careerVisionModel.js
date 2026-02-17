import mongoose from "mongoose";

const careerVisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortTerm: { type: String, required: true },
  field: { type: String, required: true },
  inspiration: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("CareerVision", careerVisionSchema);