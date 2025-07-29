import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config({path:"./"});
export const connectDB = async () => {
  try {
    const uri = process.env.mongo_url;
    if (!uri) {
      console.log(uri);
      return;
    }

    await mongoose.connect(uri);
    console.log("mongodb connected");
  } catch (err) {
    console.log("mongodb connection error", err.message);
    process.exit(1);
  }
};
