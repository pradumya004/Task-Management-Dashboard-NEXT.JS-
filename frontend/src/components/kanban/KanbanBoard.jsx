'use client';

import { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { TASK_STATUSES } from '@/lib/constants';
import useTaskStore from '@/store/taskStore';
import { arrayUtils } from '@/lib/utils';

const KanbanBoard = () => {
    const { tasks, updateTask, fetchTasks, loading, error } = useTaskStore();
    const [activeTask, setActiveTask] = useState(null);

    // Load tasks when component mounts
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Setup drag sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before activating drag
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Ensure tasks is an array
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    // Group tasks by status
    const tasksByStatus = arrayUtils.groupBy(safeTasks, 'status');

    // Ensure all statuses have an array (even if empty)
    const columns = TASK_STATUSES.map(status => ({
        status,
        tasks: tasksByStatus[status] || [],
    }));

    // Handle drag start
    const handleDragStart = (event) => {
        const { active } = event;
        const task = safeTasks.find(t => t._id === active.id);
        setActiveTask(task);
        console.log('Drag started for task:', task?.title, 'Current status:', task?.status);
    };

    // Handle drag end
    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) {
            console.log('Drag ended without valid drop target');
            return;
        }

        const taskId = active.id;
        const newStatus = over.id;

        console.log('Drag end - Task ID:', taskId, 'New Status:', newStatus);

        // Find the task being moved
        const task = safeTasks.find(t => t._id === taskId);
        if (!task) {
            console.error('Task not found:', taskId);
            return;
        }

        if (task.status === newStatus) {
            console.log('Task status unchanged, no update needed');
            return;
        }

        // Validate the new status
        if (!TASK_STATUSES.includes(newStatus)) {
            console.error('Invalid status:', newStatus, 'Valid statuses:', TASK_STATUSES);
            return;
        }

        try {
            console.log('Updating task status from', task.status, 'to', newStatus);
            
            // Update task status - only send the status field
            await updateTask(taskId, { status: newStatus });
            
            console.log('Task status updated successfully');
        } catch (error) {
            console.error('Failed to update task status:', error);
            
            // Show user-friendly error message
            const errorMessage = error.message || 'Failed to update task status';
            alert(`Error: ${errorMessage}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading kanban board...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex space-x-6 h-full overflow-x-auto">
                {columns.map(({ status, tasks }) => (
                    <div
                        key={status}
                        className="flex-shrink-0 w-80 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                        <KanbanColumn status={status} tasks={tasks} />
                    </div>
                ))}
            </div>

            {/* Drag Overlay */}
            <DragOverlay>
                {activeTask ? (
                    <div className="rotate-2 opacity-90">
                        <KanbanCard task={activeTask} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;