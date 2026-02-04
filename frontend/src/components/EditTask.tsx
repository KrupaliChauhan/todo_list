import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/Task";
import { Controller, useForm } from "react-hook-form";
// import { getTask, setTask } from "../services/taskStorage";
import { getTaskByIdApi, updateTaskApi } from "../api/tasks";

const EditTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      name: "",
      desc: "",
      dt: "",
    },
  });

  useEffect(() => {
    if (!id) {
      navigate("/home");
      return;
    }
    (async () => {
      try {
        const task = await getTaskByIdApi(id);
        reset({
          name: task.name,
          desc: task.desc,
          dt: task.dt,
        });
      } catch (err) {
        console.log(err);
        navigate("/home");
      }
    })();
  }, [id, navigate, reset]);

  const handleUpdate = async (data: Task) => {
    if (!id) return;

    await updateTaskApi(id, data);
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Edit Task
        </h2>

        <Controller
          name="name"
          control={control}
          rules={{ required: "name required " }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}
        />
        {errors.name && <p className="text-red-500"> {errors.name.message}</p>}

        <Controller
          name="desc"
          control={control}
          rules={{ required: "desc required " }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}
        />
        {errors.desc && <p className="text-red-500"> {errors.desc.message}</p>}

        <Controller
          name="dt"
          control={control}
          rules={{ required: "date is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}
        />
        {errors.dt && <p className="text-red-500"> {errors.dt.message}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/home")}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
