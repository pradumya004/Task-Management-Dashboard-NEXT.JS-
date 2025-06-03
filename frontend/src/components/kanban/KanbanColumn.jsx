'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';
import { STATUS_CONFIG } from '@/lib/constants';

const KanbanColumn = ({ status, tasks }) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    const config = STATUS_CONFIG[status];
    const taskIds = tasks.map(task => task._id);

    return (
        <div className='flex flex-col h-full'>
            {/* Column Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
                    <h3 className="font-semibold text-gray-900">{status}</h3>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Column Content */}
            <div
                ref={setNodeRef}
                className="flex-1 p-4 min-h-[200px] space-y-3 overflow-y-auto"
            >
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                            <p className="text-sm">Drop tasks here</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <KanbanCard key={task._id} task={task} />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    )
};

export default KanbanColumn;