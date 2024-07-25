import mongoose, { Schema } from "mongoose";
const tenderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

const Tender = mongoose.models.Tender || mongoose.model('Tender', tenderSchema);

export default Tender