import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API is running ");
});

app.use("/api/auth", authRouter);

export default app;
