import React from "react";
import TaskTableHeader from "./TaskTableHeader";
import TaskTableBody from "./TaskTableBody";
import TaskTableFooter from "./TaskTableFooter";

const TaskTable: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <TaskTableHeader />
          <TaskTableBody />
        </table>
      </div>

      <TaskTableFooter />
    </>
  );
};

export default TaskTable;
