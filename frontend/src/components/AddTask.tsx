import React from "react";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";
import { Controller, useForm } from "react-hook-form";
// import { getTask, setTask } from "../services/taskStorage";
import { createTaskApi } from "../api/tasks";

const AddTask: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      name: "",
      desc: "",
      dt: "",
    },
  });

  const handleClick = async (data: Task) => {
    await createTaskApi(data);
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleClick)}
        className="bg-white p-5 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Task
        </h2>

        <Controller
          name="name"
          control={control}
          rules={{ required: "Name required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Enter Task name .."
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message} </p>
        )}

        <Controller
          name="desc"
          control={control}
          rules={{ required: "descreption is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Description"
            />
          )}
        />
        {errors.desc && (
          <p className="text-red-500 text-sm"> {errors.desc.message}</p>
        )}

        <Controller
          name="dt"
          control={control}
          rules={{ required: "date is required " }}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        {errors.dt && (
          <p className="text-red-500 text-sm"> {errors.dt.message} </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>

          <button
            onClick={() => navigate("/home")}
            className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
