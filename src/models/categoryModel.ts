import mongoose, { Schema } from 'mongoose';
import { CategoryInterface } from '../interface';

const categorySchema = new Schema<CategoryInterface>({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Category = mongoose.model<CategoryInterface>('Category', categorySchema);

export default Category;