import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URI = process.env.DATABASE_URI;

export async function connectDB() {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Could not connect", error.message);
    process.exit(1);
  }
}