import mongoose, { Schema } from "mongoose";
import { UserInterface } from "../interface";

const userSchema = new Schema<UserInterface>({
username : {
    type : String,
    required : true,
    unique : true
},
email : {
    type : String,
    required : true,
    unique : true
},
password : {
    type : String,
    required : true
},
role : {
    type : String,
    required : true
},
isActive : {
    type :Boolean,
    default : true
},
isBlocked : {
    type : Boolean,
    default : false
}
}, { timestamps: true })

export const User = mongoose.model<UserInterface>("User", userSchema);