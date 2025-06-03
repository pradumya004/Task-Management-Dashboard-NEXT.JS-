"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate, isOverdue, truncateText } from "@/lib/utils";

const KanbanCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isTaskOverdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-grab
        hover:shadow-md transition-shadow
        ${isDragging ? "opacity-50 rotate-2" : ""}
      `}
    >
      {/* Task Title */}
      <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {truncateText(task.description, 80)}
        </p>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center text-xs mb-2">
          <svg
            className="w-3 h-3 mr-1 text-gray-400"
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
              isTaskOverdue ? "text-red-600 font-medium" : "text-gray-500"
            }
          >
            {formatDate(task.dueDate)}
          </span>
        </div>
      )}

      {/* Footer - Click to view details */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {formatDate(task.createdAt)}
        </div>
        <Link
          href={`/tasks/${task._id}`}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking link
        >
          View →
        </Link>
      </div>
    </div>
  );
};

export default KanbanCard;
