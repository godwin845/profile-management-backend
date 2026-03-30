import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define interface for individual social links
interface ISocialLink {
  social: string;
  link: string;
}

// 2. Define interface representing a document in MongoDB
export interface ISocial extends Document {
  user: mongoose.Types.ObjectId;
  socials: ISocialLink[];
  createdAt: Date;
  updatedAt: Date;
}

// 3. Define the schema
const socialSchema: Schema<ISocial> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    socials: [
      {
        social: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// 4. Create the model
const Social = model<ISocial>("Social", socialSchema);

export default Social;