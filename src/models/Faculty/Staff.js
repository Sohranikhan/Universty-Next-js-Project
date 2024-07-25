// Staff model
import mongoose, { Schema } from "mongoose";

const staffSchema = new Schema({
  image: String,
  name: String,
  email: String,
  position: String,
  slug: String,
  socialMedia: [{
    provider: String,
    url: String
  }],
  researchPapers: [{
    title: String,
    publication: String,
    year: Number,
    url: String
  }],
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
},{timestamps: true});

const Staff = mongoose.models.Staff || mongoose.model('Staff', staffSchema)
export default Staff