import mongoose, { Schema } from 'mongoose'

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

export const Module = mongoose.model('Module', ModuleSchema)
