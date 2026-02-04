import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import { useAuth } from "../context/AuthContext";
import { getTasksApi, deleteTaskApi } from "../api/tasks";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTasks = async (p = page, l = rowsPerPage) => {
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

  const addTask = () => navigate("/addTask");

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;

    await deleteTaskApi(id);
    const isLastItemOnPage = tasks.length === 1 && page > 1;
    const newPage = isLastItemOnPage ? page - 1 : page;

    await fetchTasks(newPage, rowsPerPage);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToPage = (p: number) => {
    const safe = Math.min(Math.max(1, p), totalPages);
    setPage(safe);
  };

  const pageButtons = useMemo(() => {
    const windowSize = 5;
    let start = Math.max(1, page - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - windowSize + 1);
    }

    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }, [page, totalPages]);

  const from = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, total);

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

        <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-600">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Total: <span className="font-semibold">{total}</span> tasks
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded px-2 py-1 bg-white"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 mt-16">
            Loading tasks...
          </div>
        ) : total === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tasks available</p>
            <p className="text-sm">Click “Add Task” to get started</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="text-gray-700 text-sm">
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Task Name</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Due Date</th>
                    <th className="px-4 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {tasks.map((task, idx) => {
                    const srNo = (page - 1) * rowsPerPage + idx + 1;
                    return (
                      <tr key={task.id} className="text-sm hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-600">{srNo}</td>

                        <td className="px-4 py-3 font-medium text-gray-800">
                          {task.name}
                        </td>

                        <td className="px-4 py-3 text-gray-700">{task.desc}</td>

                        <td className="px-4 py-3 text-gray-600">{task.dt}</td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => navigate(`/editTask/${task.id}`)}
                              className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-red-600 hover:text-red-800 font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{from}</span> to{" "}
                <span className="font-semibold">{to}</span> of{" "}
                <span className="font-semibold">{total}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
                >
                  Prev
                </button>

                {pageButtons.map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-3 py-1 border rounded bg-white hover:bg-gray-50 ${
                      p === page ? "font-bold border-gray-800" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
