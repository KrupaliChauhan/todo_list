import { Router } from "express";
import { register } from "../controllers/auth/register.js";
import { login } from "../controllers/auth/login.js";

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
export default authRouter;
