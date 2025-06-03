"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/tasks/TaskForm";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";
import { formatDate, isOverdue } from "@/lib/utils";
import useTaskStore from "@/store/taskStore";

const TaskDetailPage = ({ params }) => {
  const router = useRouter();
  const { deleteTask } = useTaskStore();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = use(params);

  // Load task when component mounts
  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      setLoading(true);
      setError(null);
      const taskData = await api.getTask(id);
      setTask(taskData);
    } catch (error) {
      console.error("Error loading task:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    loadTask(); // Reload task data
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task._id);
        router.push("/"); // Go back to dashboard
      } catch (error) {
        alert("Failed to delete task: " + error.message);
        console.error("Error deleting task:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-200 border border-red-300 rounded-lg p-4">
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
          <div>
            <p className="text-red-800">Error: {error}</p>
            <Button
              variant="primary"
              onClick={() => router.push("/")}
              className="mt-2"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Task not found</h2>
        <p className="text-gray-500 mt-2">
          The task you're looking for doesn't exist.
        </p>
        <Button
          variant="primary"
          onClick={() => router.push("/")}
          className="mt-4"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Task</h1>
          <TaskForm
            task={task}
            onSuccess={handleUpdateSuccess}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  const isTaskOverdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="secondary" onClick={() => router.back()}>
          ← Back
        </Button>
        <div className="flex space-x-3">
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit Task
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Task
          </Button>
        </div>
      </div>

      {/* Task Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Title and Status */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
          <Badge status={task.status} />
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}

        {/* Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Due Date */}
          {task.dueDate && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Due Date
              </h4>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span
                  className={
                    isTaskOverdue ? "text-red-600 font-medium" : "text-gray-700"
                  }
                >
                  {formatDate(task.dueDate)}
                  {isTaskOverdue && " (Overdue)"}
                </span>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Created
            </h4>
            <p className="text-gray-700">{formatDate(task.createdAt)}</p>
          </div>

          {/* Updated Date */}
          {task.updatedAt && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Last Updated
              </h4>
              <p className="text-gray-700">{formatDate(task.updatedAt)}</p>
            </div>
          )}

          {/* Status */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Status</h4>
            <Badge status={task.status} />
          </div>
        </div>

        {/* Custom Fields (if any) */}
        {task.customFields && Object.keys(task.customFields).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Custom Fields
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(task.customFields, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;
