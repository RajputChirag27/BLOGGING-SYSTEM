import mongoose, { Schema } from 'mongoose'
import { UserInterface } from '../interface'
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<UserInterface>(
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN
  })
}

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model<UserInterface>('User', UserSchema)
