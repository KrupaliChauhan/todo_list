import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  name: string;
  desc: string;
  dt: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks: Task[] = JSON.parse(
      localStorage.getItem("items") || "[]",
    );
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    navigate("/addTask");
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("items", JSON.stringify(updatedTasks));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tasks available</p>
            <p className="text-sm">Click “Add Task” to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{task.desc}</p>
                  <p className="text-sm text-gray-400 mt-2">Due: {task.dt}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/editTask/${index}`)}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
