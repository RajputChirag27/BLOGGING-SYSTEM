import mongoose from "mongoose";
import { config } from "dotenv";
config()

const url = process.env.MONGO_URL
export default mongoose.connect(url).then(() => {
    console.log("Database connected Successfully")
}).catch((err) =>
    console.error("Error in Connecting database: " + err)
)