import dotenv from "dotenv";
dotenv.config();

// function requireENV(name: string): string {
//   const value = process.env[name];
//   if (!value) throw new Error(`Environment variable ${name} is missing `);
//   return value;
// }

const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN,
};

const config = Object.freeze(_config);
export default config;
