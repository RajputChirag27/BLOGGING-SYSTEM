import mongoose, { Schema } from 'mongoose';
import { TagsInterface } from '../interface';

const tagSchema = new Schema<TagsInterface>({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Tag = mongoose.model<TagsInterface>('Tag', tagSchema);

export default Tag;