'use client';

import { TASK_STATUSES } from '@/lib/constants';
import useTaskStore from '@/store/taskStore';

const TaskFilters = () => {
    const { filters, setFilters } = useTaskStore();

    const handleStatusChange = (e) => {
        setFilters({ status: e.target.value });
    };

    const handleSortChange = (e) => {
        setFilters({ sortBy: e.target.value });
    };

    const handleOrderChange = (e) => {
        setFilters({ order: e.target.value });
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                    Status:
                </label>
                <select
                    value={filters.status}
                    onChange={handleStatusChange}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">All Tasks</option>
                    {TASK_STATUSES.map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                    Sort by:
                </label>
                <select
                    value={filters.sortBy}
                    onChange={handleSortChange}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="createdAt">Created Date</option>
                    <option value="updatedAt">Updated Date</option>
                    <option value="dueDate">Due Date</option>
                    <option value="title">Title</option>
                    <option value="status">Status</option>
                </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                    Order:
                </label>
                <select
                    value={filters.order}
                    onChange={handleOrderChange}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;