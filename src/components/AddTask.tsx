import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  name: string;
  desc: string;
  dt: string;
}

const AddTask: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [dt, setDt] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (!name || !desc || !dt) {
      setError("All fields are required");
      return;
    }

    const tasks: Task[] = JSON.parse(localStorage.getItem("items") || "[]");

    tasks.push({ name, desc, dt });
    localStorage.setItem("items", JSON.stringify(tasks));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Task
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dt}
          onChange={(e) => setDt(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={handleClick}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
