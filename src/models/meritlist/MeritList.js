import mongoose, { Schema } from 'mongoose';

const MeritListSchema = new mongoose.Schema({
  program: { type: Schema.Types.ObjectId, ref: 'Program' },
  pdfUrl: { type: String }
},{timestamps: true});

export default mongoose.models.MeritList || mongoose.model('MeritList', MeritListSchema);