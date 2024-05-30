import mongoose, { Schema } from 'mongoose'


const RoleSchema = new Schema(
    {
        role: { type: String, required: true, unique: true },
    }
)

export const Role = mongoose.model('Role', RoleSchema);

