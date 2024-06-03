import mongoose, { Schema } from 'mongoose'

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

export const Module = mongoose.model('Module', ModuleSchema)
