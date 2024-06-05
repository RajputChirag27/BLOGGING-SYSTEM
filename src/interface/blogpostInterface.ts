import { Document, type ObjectId } from 'mongoose'

export interface BlogInterface extends Document {
  userId?: ObjectId
  title?: string
  content?: string
  category?: string
  likes?: number
  dislikes?: number
  isActive?: boolean
  isDeleted?: boolean
  isBlocked?: boolean
  createdAt?: Date
  updatedAt?: Date
  tags?: string[] // Tags in the database
  comments?: ObjectId[] // Or a detailed CommentInterface array if comments are embedded
  views?: number
  authorName?: string // Author name
  featuredImage?: string // image URL of blog
  summary?: string // summary of blog
  slug?: string // slug string of title of blog
  seoTitle?: string //  SEO title
  seoDescription?: string // SEO Description
  likedBy?: ObjectId[] // Array of user IDs who liked the post
  dislikedBy?: ObjectId[] // Array of user IDs who disliked the post
  readTime?: number // Estimated read time in minutes
  status?: string // Status of the post, e.g., 'draft', 'published'
  visibility?: string // Visibility of the post, e.g., 'public', 'private'
  featured?: boolean // If the post is featured
  language?: string // Language of the post
  attachments?: string[] // URLs or IDs of attachments
  series?: ObjectId // Link to a series or collection of related posts
  pinned?: boolean // If the post is pinned to the top
  relatedPosts?: ObjectId[] // Array of related post IDs
}
