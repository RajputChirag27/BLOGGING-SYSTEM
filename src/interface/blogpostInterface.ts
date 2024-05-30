import { type ObjectId } from 'mongoose'

export interface BlogInterface {
  userId?: ObjectId
  title?: string
  content?: string
  category?: string
  isActive?: boolean
  isDeleted?: boolean
  isBlocked?: boolean
  createdAt?: Date
  updatedAt?: Date
}
