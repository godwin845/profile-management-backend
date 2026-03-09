import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  doj: {
    type: String,
    required: true,
  },
  doe: String,
  
  present: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Experience", experienceSchema);