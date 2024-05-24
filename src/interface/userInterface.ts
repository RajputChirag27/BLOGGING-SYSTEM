import { Document } from "mongoose";

export interface UserInterface extends Document {
    "username": string,
    "email": string,
    "password": string,
    "role": string,
    "isActive": boolean,
    "isDeleted": boolean,
    "isBlocked": boolean,
    "createdAt": Date,
    "updatedAt": Date
}