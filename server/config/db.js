import mongoose from "mongoose";

export default async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("db connected successfully")
    } catch (error) {
        console.error("DB connection error:", error) 
    }
}