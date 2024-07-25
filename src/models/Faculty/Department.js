// Department model
import mongoose,{Schema} from "mongoose";

const departmentSchema =  new Schema({
    name: String,
    hod: {type: Schema.Types.ObjectId, ref: 'Staff'},
    slug: String,
    description: {
      type: String,
      trim: true,
      default: ''
    },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff'}],
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program'}]
  },{timestamps: true});
  
  const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema)
  export default Department