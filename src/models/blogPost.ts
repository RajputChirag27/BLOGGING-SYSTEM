import { BlogInterface } from '../interface'
import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const postSchema = new Schema<BlogInterface>({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [100, 'Post title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    required: [true, 'Post slug is required'],
    slug: 'title' // Generate slug from title
  },
  content: {
    type: String,
    required: [true, 'Post content is required']
  },
  summary: {
    type: String,
    required: [true, 'Post excerpt is required'],
    maxlength: [300, 'Post excerpt cannot exceed 300 characters']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Post author is required']
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Post categories are required']
    }
  ],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  readingTime: {
    type: Number,
    required: [true, 'Reading time is required']
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  metaKeywords: [
    {
      type: String,
      trim: true
    }
  ],
  isEditorsPick: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
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
  },
  relatedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

const Post = mongoose.model<BlogInterface>('Post', postSchema)
export default Post
