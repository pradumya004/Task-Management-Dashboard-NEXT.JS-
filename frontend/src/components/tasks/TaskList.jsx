"use client";

import TaskCard from "./TaskCard";
import useTaskStore from "@/store/taskStore";

const TaskList = () => {
  const { getFilteredTasks, loading, error, tasks: allTasks } = useTaskStore();

  // Use getFilteredTasks() instead of raw tasks to respect filters
  const tasks = getFilteredTasks();

  // Extra defensive check
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  console.log("TaskList - tasks:", safeTasks, "length:", safeTasks.length);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-red-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!safeTasks || safeTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500">
          {allTasks && allTasks.length === 0
            ? "Create your first task to get started!"
            : "No tasks match the current filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {safeTasks.map((task) => {
        // Extra safety check for each task
        if (!task || !task._id) {
          console.warn("Invalid task found:", task);
          return null;
        }
        return <TaskCard key={task._id} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
