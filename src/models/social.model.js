import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Store all social links for a user in a single document
    socials: [
      {
        social: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);