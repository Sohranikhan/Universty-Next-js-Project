import mongoose, { Schema } from "mongoose";

const officeStaff = new Schema({
  image: {type: String},
  name: String,
  email: String,
  phone: String,
  position: String,
  office: {type: Schema.Types.ObjectId, ref:"Office"},
  socialMedia: [{
    provider: String,
    url: String
  }],
}, { timestamps: true });

const OfficeStaff = mongoose?.models?.officeStaff || mongoose.model('officeStaff', officeStaff)
export default OfficeStaff 
