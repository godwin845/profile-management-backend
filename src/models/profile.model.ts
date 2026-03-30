import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  location?: string | undefined;
  bio?: string | undefined;
  profileImage?: string; // file path or URL
  resumeFile?: string; // file path or URL
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const profileSchema: Schema<IProfile> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String },
    bio: { type: String },
    profileImage: { type: String }, // store file path or URL
    resumeFile: { type: String }, // store file path or URL
  },
  { timestamps: true }
);

// 3. Create the model
const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;