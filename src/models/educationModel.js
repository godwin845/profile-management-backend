import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    college: String,
    degree: String,
    field: String,
    location: String,
    doj: Date,
    doe: Date,
    studying: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Education", EducationSchema);