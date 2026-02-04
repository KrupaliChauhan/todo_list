import React from "react";
import { useTaskTable } from "../../context/TaskTableContext";

const TaskTableBody: React.FC = () => {
  const { loading, tasks, page, rowsPerPage, onEdit, onDelete } =
    useTaskTable();

  return (
    <tbody className="divide-y">
      {loading ? (
        <tr>
          <td className="px-4 py-6 text-gray-500" colSpan={5}>
            Loading...
          </td>
        </tr>
      ) : (
        tasks.map((task, idx) => {
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
                    onClick={() => onEdit(task.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  );
};

export default TaskTableBody;
