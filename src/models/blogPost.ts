import { Schema, model } from 'mongoose'
import { BlogInterface } from '../interface'

const PostSchema = new Schema<BlogInterface>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Post = model<BlogInterface>('Post', PostSchema)
export default Post
