import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: String,
    company: String,
    location: String,
    doj: Date,
    doe: Date,
    present: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Experience", ExperienceSchema);