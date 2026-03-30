import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IEducation extends Document {
  user: mongoose.Types.ObjectId;
  college: string;
  degree: string;
  field: string;
  location?: string;
  doj: Date;
  doe?: Date;
  studying: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const educationSchema: Schema<IEducation> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    doj: {
      type: Date,
      required: true,
    },
    doe: {
      type: Date,
    },
    studying: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 3. Create the model
const Education = model<IEducation>("Education", educationSchema);

export default Education;