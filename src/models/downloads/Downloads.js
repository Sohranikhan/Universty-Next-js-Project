import mongoose, { Schema } from "mongoose";
const downloadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

const Download = mongoose.models.Download || mongoose.model('Download', downloadSchema);

export default Download