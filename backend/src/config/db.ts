import mongoose from "mongoose";
import config from "./envConfig.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};
