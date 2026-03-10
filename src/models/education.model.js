import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      required: true
    },

    degree: {
      type: String,
      required: true
    },

    field: {
      type: String,
      required: true
    },

    location: {
      type: String
    },

    doj: {
      type: Date,
      required: true
    },

    doe: {
      type: Date
    },

    studying: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);