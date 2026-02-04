import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";

const taskRouter = Router();

taskRouter.get("/", protect, getTasks);
taskRouter.get("/:id", protect, getTaskById);
taskRouter.post("/", protect, createTask);
taskRouter.put("/:id", protect, updateTask);
taskRouter.delete("/:id", protect, deleteTask);

export default taskRouter;
