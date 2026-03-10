import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  bio: { type: String },
  profileImage: { type: String }, // store file path or URL
  resumeFile: { type: String }    // store file path or URL
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);