import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface ICertificate extends Document {
  user: mongoose.Types.ObjectId;
  certification: string;
  provider: string;
  url?: string;
  certID?: string;
  issuedDate?: string;
  expDate?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const certificateSchema: Schema<ICertificate> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    certification: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    url: { type: String },
    certID: { type: String },
    issuedDate: { type: String },
    expDate: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// 3. Create the model
const Certificate = model<ICertificate>("Certificate", certificateSchema);

export default Certificate;