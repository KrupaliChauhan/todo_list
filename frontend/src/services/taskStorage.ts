import type { Task } from "../types/Task";

export const getTask = (): Task[] => {
  return JSON.parse(localStorage.getItem("items") || "[]");
};

export const setTask = (tasks: Task[]) => {
  localStorage.setItem("items", JSON.stringify(tasks));
};
