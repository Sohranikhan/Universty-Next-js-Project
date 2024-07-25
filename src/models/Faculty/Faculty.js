// Faculty model
import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema({
  name: String,
  dean: {type: Schema.Types.ObjectId, ref: 'Staff'},
  slug: String,
  description: {
    type: String,
    trim: true,
    default: ''
  },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }]
},{timestamps: true});

const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema)
export default Faculty
