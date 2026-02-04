import React, { createContext, useContext } from "react";
import type { Task } from "../types/Task";

type TaskTableContextType = {
  loading: boolean;
  tasks: Task[];

  page: number;
  rowsPerPage: number;
  total: number;
  totalPages: number;

  setPage: (p: number) => void;
  setRowsPerPage: (n: number) => void;

  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
};

const TaskTableContext = createContext<TaskTableContextType | null>(null);

export const TaskTableProvider: React.FC<{
  value: TaskTableContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TaskTableContext.Provider value={value}>
      {children}
    </TaskTableContext.Provider>
  );
};

export const useTaskTable = () => {
  const ctx = useContext(TaskTableContext);
  if (!ctx)
    throw new Error("useTaskTable must be used inside TaskTableProvider");
  return ctx;
};
