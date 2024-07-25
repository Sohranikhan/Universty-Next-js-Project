// CampusLife model
import mongoose, { Schema } from "mongoose";

const campusLifeSchema = new Schema({
    title: String,
    slug: String,
    description: String,
}, { timestamps: true });

const CampusLife = mongoose.models.campusLife || mongoose.model('campusLife', campusLifeSchema)
export default CampusLife