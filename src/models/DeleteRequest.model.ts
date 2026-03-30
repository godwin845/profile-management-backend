import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IDeleteRequest extends Document {
  user: mongoose.Types.ObjectId;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the schema
const deleteRequestSchema: Schema<IDeleteRequest> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// 3. Create the model
const DeleteRequest = model<IDeleteRequest>("DeleteRequest", deleteRequestSchema);

export default DeleteRequest;