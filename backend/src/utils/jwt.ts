import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

export const signToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret!, {
    expiresIn: config.jwtExpireIn || "1d",
  });
};
