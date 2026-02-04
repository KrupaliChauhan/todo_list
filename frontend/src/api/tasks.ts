import { api } from "./api";
import type { Task } from "../types/Task";

export type PaginatedTasksResponse = {
  data: Task[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const getTasksApi = async (page: number, limit: number) => {
  const res = await api.get<PaginatedTasksResponse>("/tasks", {
    params: { page, limit },
  });
  return res.data;
};

export const getTaskByIdApi = async (id: string) => {
  const res = await api.get<Task>(`/tasks/${id}`);
  return res.data;
};

export const createTaskApi = async (data: Omit<Task, "id">) => {
  const res = await api.post<Task>("/tasks", data);
  return res.data;
};

export const updateTaskApi = async (id: string, data: Omit<Task, "id">) => {
  const res = await api.put<Task>(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTaskApi = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
