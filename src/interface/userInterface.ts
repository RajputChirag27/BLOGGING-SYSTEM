import { Document, type ObjectId } from 'mongoose'

export interface UserInterface extends Document {
  username?: string
  email?: string
  password?: string
  role?: string
  secret?: object
  isActive?: boolean
  isDeleted?: boolean
  isBlocked?: boolean
  createdAt?: Date
  updatedAt?: Date
}
