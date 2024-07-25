// admission model
import mongoose, { Schema } from "mongoose";

const admissionSchema = new Schema({
    title: String,
    slug: String,
    description: String,
}, { timestamps: true });

const Admission = mongoose.models.admission || mongoose.model('admission', admissionSchema)
export default Admission