import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);