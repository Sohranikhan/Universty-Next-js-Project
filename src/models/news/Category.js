// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Ensure category names are unique
    trim: true,
  },
  slug: {
    type: String,
    unique: true,  // Ensure slugs are unique
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Category =  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
