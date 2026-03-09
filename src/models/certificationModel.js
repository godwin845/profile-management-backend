import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certification: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  url: String,
  certID: String,
  issuedDate: String,
  expDate: String,
  description: String,
});

export default mongoose.model("Certificate", certificateSchema);