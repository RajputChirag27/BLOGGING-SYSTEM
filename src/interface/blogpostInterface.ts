import mongoose, { Document } from 'mongoose'

export interface BlogInterface extends Document {
  title?: string
  slug?: string
  content?: string
  summary?: string
  author?: mongoose.Types.ObjectId | string
  categories?: (mongoose.Types.ObjectId | string)[]
  tags?: (mongoose.Types.ObjectId | string)[]
  featuredImage?: string
  status?: 'draft' | 'published'
  publishedAt?: Date
  updatedAt?: Date
  views?: number
  likes?: (mongoose.Types.ObjectId | string)[]
  dislikes?: (mongoose.Types.ObjectId | string)[]
  comments?: (mongoose.Types.ObjectId | string)[]
  readingTime?: number
  allowComments?: boolean
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  isEditorsPick?: boolean
  isFeatured?: boolean
  isActive?: boolean
  isDeleted?: boolean
  isBlocked?: boolean
  relatedPosts?: (mongoose.Types.ObjectId | string)[]
}
