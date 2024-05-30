import mongoose, { Schema } from 'mongoose'

const PermissionSchema = new Schema({
  moduleid: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  },
  roleid: {
    type: Schema.ObjectId,
    required: true,
    unique: true
  },
  read: {
    type: Boolean,
    default: false
  },
  write: {
    type: Boolean,
    default: false
  },
  update: {
    type: Boolean,
    default: false
  },
  delete: {
    type: Boolean,
    default: false
  }
})

export const Permission = mongoose.model('Permission', PermissionSchema)
