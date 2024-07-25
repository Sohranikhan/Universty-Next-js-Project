// Program model
import mongoose,{Schema} from "mongoose";

const programSchema =  new Schema({
    name: String,
    slug: String,
    description: {
      type: String,
      trim: true,
      default: ''
    },
    meritLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MeritList' }],
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
  },{timestamps: true});
  
  const Program = mongoose.models.Program || mongoose.model('Program', programSchema)
  export default Program