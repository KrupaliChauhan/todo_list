import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  name: string;
  desc: string;
  dt: string;
}

const EditTask: React.FC = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const taskIndex = Number(index);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dt, setDt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("items") || "[]");

    if (isNaN(taskIndex) || !tasks[taskIndex]) {
      navigate("/");
      return;
    }

    const task = tasks[taskIndex];
    setName(task.name);
    setDesc(task.desc);
    setDt(task.dt);
  }, [taskIndex, navigate]);

  const handleUpdate = () => {
    if (!name || !desc || !dt) {
      setError("All fields are required");
      return;
    }

    const tasks: Task[] = JSON.parse(localStorage.getItem("items") || "[]");

    tasks[taskIndex] = { name, desc, dt };
    localStorage.setItem("items", JSON.stringify(tasks));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Edit Task
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={dt}
          onChange={(e) => setDt(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
