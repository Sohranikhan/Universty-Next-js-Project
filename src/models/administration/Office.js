import mongoose, { Schema } from "mongoose";

const officeSchema = new Schema({
  slug: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  head: {type: Schema.Types.ObjectId, ref:'officeStaff'}, 
  staff: [{type: Schema.Types.ObjectId, ref:'officeStaff'}],
}, { timestamps: true });


const Office = mongoose?.models?.Office || mongoose.model('Office', officeSchema)
export default Office 
