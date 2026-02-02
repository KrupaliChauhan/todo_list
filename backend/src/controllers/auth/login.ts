import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { signToken } from "../../utils/jwt.js";
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = signToken({ userId: user._id });

    return res.json({
      message: "logged in",
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
