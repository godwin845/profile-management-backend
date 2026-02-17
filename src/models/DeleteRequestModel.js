import mongoose from "mongoose";

const deleteRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("DeleteRequest", deleteRequestSchema);