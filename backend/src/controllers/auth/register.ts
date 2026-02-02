import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { signToken } from "../../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "username and password required !!" });

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(409).json({ message: "user already exist" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    const token = signToken({ userId: user._id });
    return res.status(201).json({
      message: "registered",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    console.log(err);
  }
};
