import mongoose, { Schema } from 'mongoose'
import { UserInterface } from '../interface'
import { Types } from 'mongoose'

const userSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    secret: {
      type: Object
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

export const User = mongoose.model<UserInterface>('User', userSchema)
