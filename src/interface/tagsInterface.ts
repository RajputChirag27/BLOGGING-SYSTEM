import mongoose, { Document } from 'mongoose';

export interface TagsInterface extends Document {
  name: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}