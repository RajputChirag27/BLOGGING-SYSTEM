import mongoose, { Schema } from 'mongoose'

export interface RoleInterface extends Document {
  role?: string
}

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true },
  isActive : {
    type : Boolean,
    default : true
  },
  isDeleted : {
    type : Boolean,
    default : false
  }
})

export const Role = mongoose.model('Role', RoleSchema)
