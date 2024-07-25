import mongoose, { Schema } from "mongoose";
const directorySchema = new Schema({
  title: { type: String, required: true },
  slug: String,
  description: String,
  departments: [{type: Schema.Types.ObjectId, ref:"Department"}],
}, { timestamps: true });

const Directory = mongoose.models.directory || mongoose.model('directory', directorySchema)
export default Directory 

// // Define the specific offices
// const viceChancellorOffice = new Office({
//   title: "Vice Chancellor Office",
//   description: "Information about the Vice Chancellor's office.",
//   head: "Dr. John Doe",
//   contactEmail: "vc@university.edu",
//   contactPhone: "123-456-7890",
//   address: "123 University St, City, Country",
//   additionalInfo: { website: "http://vc.university.edu" }
// });

// const registrarOffice = new Office({
//   title: "Registrar Office",
//   description: "Information about the Registrar's office.",
//   head: "Ms. Jane Smith",
//   contactEmail: "registrar@university.edu",
//   contactPhone: "123-456-7891",
//   address: "124 University St, City, Country",
//   additionalInfo: { website: "http://registrar.university.edu" }
// });

// // Define a sample directory
// const computingDirectory = new Directory({
//   title: "Directories of Computing & IT",
//   departments: [
//     {
//       name: "Computer Science Department",
//       head: "Prof. Alan Turing",
//       contactEmail: "cs@university.edu",
//       contactPhone: "123-456-7892",
//       additionalInfo: { website: "http://cs.university.edu" }
//     },
//     {
//       name: "Information Technology Department",
//       head: "Dr. Grace Hopper",
//       contactEmail: "it@university.edu",
//       contactPhone: "123-456-7893",
//       additionalInfo: { website: "http://it.university.edu" }
//     }
//   ]
// });