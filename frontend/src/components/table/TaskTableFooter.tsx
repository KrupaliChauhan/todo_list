import React, { useMemo } from "react";
import { useTaskTable } from "../../context/TaskTableContext";

const TaskTableFooter: React.FC = () => {
  const { page, rowsPerPage, total, totalPages, setPage, setRowsPerPage } =
    useTaskTable();

  const from = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, total);

  const pages = useMemo(() => {
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

  const goToPage = (p: number) => {
    const safe = Math.min(Math.max(1, p), totalPages);
    setPage(safe);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{from}</span> to{" "}
        <span className="font-semibold">{to}</span> of{" "}
        <span className="font-semibold">{total}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows:</span>
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

        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 bg-white hover:bg-gray-50"
        >
          Prev
        </button>

        {pages.map((p) => (
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
  );
};

export default TaskTableFooter;
