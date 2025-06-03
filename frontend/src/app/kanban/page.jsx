"use client";

import { useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import TaskForm from "@/components/tasks/TaskForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const KanbanPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    // Tasks will automatically update via store
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
          <p className="text-gray-600 mt-2">
            Drag and drop tasks to update their status
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          + Create Task
        </Button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-800">
              How to use the Kanban board
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              • Drag tasks between columns to change their status
              <br />
              • Click "View →" on any task to see full details
              <br />• Create new tasks using the button above
            </p>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="h-[calc(100vh-240px)] overflow-hidden">
        <KanbanBoard />
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
      >
        <TaskForm
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </div>
  );
};

export default KanbanPage;