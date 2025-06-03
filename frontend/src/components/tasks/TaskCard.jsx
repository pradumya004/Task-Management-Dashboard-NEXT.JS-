'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate, isOverdue, truncateText } from '@/lib/utils';
import useTaskStore from '@/store/taskStore';

const TaskCard = ({ task }) => {
    const { deleteTask } = useTaskStore();

    const handleDelete = async (e) => {
        e.preventDefault(); // Prevent navigation when clicking delete
        e.stopPropagation();

        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(task._id);
            } catch (error) {
                alert('Failed to delete task');
            }
        }
    };

    const isTaskOverdue = isOverdue(task.dueDate, task.status);

    return (
        <Link href={`/tasks/${task._id}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {task.title}
                    </h3>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete}
                        className="ml-2 px-2 py-1 text-xs"
                    >
                        Delete
                    </Button>
                </div>

                {/* Description */}
                {task.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {truncateText(task.description, 100)}
                    </p>
                )}

                {/* Status Badge */}
                <div className="mb-3">
                    <Badge status={task.status} />
                </div>

                {/* Due Date */}
                {task.dueDate && (
                    <div className="flex items-center text-sm mb-3">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className={isTaskOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}>
                            {formatDate(task.dueDate)}
                            {isTaskOverdue && ' (Overdue)'}
                        </span>
                    </div>
                )}

                {/* Footer */}
                <div className="text-xs text-gray-400 border-t pt-2">
                    Created {formatDate(task.createdAt)}
                </div>
            </div>
        </Link>
    );
};

export default TaskCard;