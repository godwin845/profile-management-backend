import { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location?: string;
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    dateOfBirth: { type: String },
  },
  { timestamps: true }
);

// 3. Create the model
const User = model<IUser>("User", userSchema);

export default User;