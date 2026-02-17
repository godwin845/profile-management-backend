import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  bio: { type: String },
  profileImage: { type: String },
  resume: { type: String }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);