import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    name: String,
    organization: String,
    issueDate: Date,
    expirationDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Certification", CertificationSchema);