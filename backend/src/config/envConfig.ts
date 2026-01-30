import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

const config = Object.freeze(_config);
export default config;
