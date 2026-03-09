import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  social: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Social", socialSchema);