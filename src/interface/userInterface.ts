import { Document, type ObjectId } from 'mongoose'

export interface UserInterface extends Document {
  username?: string
  email?: string
  password?: string
  role?: ObjectId
  secret?: object
  isActive?: boolean
  isDeleted?: boolean
  isBlocked?: boolean
  createdAt?: Date
  updatedAt?: Date
  refreshToken?: string
  permissions?: object
  getSignedToken(): string
  matchPasswords(password : string): boolean
  setRefreshToken(token : object) : string
}
