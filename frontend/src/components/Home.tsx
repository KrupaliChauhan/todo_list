import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import { useAuth } from "../context/AuthContext";
import { deleteTaskApi, getTasksApi } from "../api/tasks";
import TaskTable from "./table/TaskTable";
import { TaskTableProvider } from "../context/TaskTableContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (p: number, l: number) => {
    setLoading(true);
    try {
      const res = await getTasksApi(p, l);
      setTasks(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
      setPage(res.pagination.page);
      setRowsPerPage(res.pagination.limit);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1, rowsPerPage);
  }, []);

  useEffect(() => {
    fetchTasks(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;

    await deleteTaskApi(id);

    const isLastItemOnPage = tasks.length === 1 && page > 1;
    const newPage = isLastItemOnPage ? page - 1 : page;

    await fetchTasks(newPage, rowsPerPage);
  };

  const handleEdit = (id: string) => navigate(`/editTask/${id}`);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const addTask = () => navigate("/addTask");

  const tableValue = {
    loading,
    tasks,
    page,
    rowsPerPage,
    total,
    totalPages,
    setPage,
    setRowsPerPage,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>

          <div className="flex gap-3">
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Task
            </button>

            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        {!loading && total === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tasks available</p>
            <p className="text-sm">Click “Add Task” to get started</p>
          </div>
        ) : (
          <TaskTableProvider value={tableValue}>
            <TaskTable />
          </TaskTableProvider>
        )}
      </div>
    </div>
  );
};

export default Home;
