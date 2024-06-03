import { type ObjectId } from 'mongoose'

export interface BlogInterface {
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
}
