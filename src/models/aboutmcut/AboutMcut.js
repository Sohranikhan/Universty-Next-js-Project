// AboutMcut model
import mongoose, { Schema } from "mongoose";

const aboutMcutSchema = new Schema({
    title: String,
    slug: String,
    description: String,
}, { timestamps: true });

const AboutMcut = mongoose.models.aboutmcut || mongoose.model('aboutmcut', aboutMcutSchema)
export default AboutMcut