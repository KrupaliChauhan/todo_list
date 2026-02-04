import React from "react";

const TaskTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr className="text-gray-700 text-sm">
        <th className="px-4 py-3 font-semibold">#</th>
        <th className="px-4 py-3 font-semibold">Task Name</th>
        <th className="px-4 py-3 font-semibold">Description</th>
        <th className="px-4 py-3 font-semibold">Due Date</th>
        <th className="px-4 py-3 font-semibold text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default TaskTableHeader;
