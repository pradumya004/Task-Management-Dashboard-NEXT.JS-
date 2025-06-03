import { create } from "zustand";
import { api } from "@/lib/api";
import { VALIDATION_MESSAGES } from "@/lib/constants";

const useTaskStore = create((set, get) => ({
    // State
    tasks: [],
    loading: false,
    error: null,
    filters: {
        status: 'all',
        sortBy: 'createdAt',
        order: 'desc'
    },

    // Actions For Updating State
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // Update Filters
    setFilters: (newFilters) => set(
        (state) => ({
            filters: { ...state.filters, ...newFilters }
        })
    ),

    // Fetch All Tasks - FIXED: Now calls api.getTasks()
    fetchTasks: async () => {
        const { filters } = get();
        set({ loading: true, error: null });

        try {
            const apiFilters = {
                ...filters,
                status: filters.status === 'all' ? undefined : filters.status
            };

            // Remove undefined values
            Object.keys(apiFilters).forEach(key =>
                apiFilters[key] === undefined && delete apiFilters[key]
            );

            const tasksData = await api.getTasks(apiFilters);

            // Ensure we have an array
            const tasks = Array.isArray(tasksData) ? tasksData : [];

            set({
                tasks,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            set({
                error: error.message,
                loading: false,
                tasks: []
            });
        }
    },

    // Get Filtered Tasks
    getFilteredTasks: () => {
        const { tasks, filters } = get();

        // Ensure tasks is always an array
        if (!Array.isArray(tasks)) {
            console.warn('Tasks is not an array:', tasks);
            return [];
        }

        let filtered = [...tasks];

        // Filter by status
        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(task => task && task.status === filters.status);
        }

        // Sort
        filtered.sort((a, b) => {
            if (!a || !b) return 0;

            const aValue = a[filters.sortBy];
            const bValue = b[filters.sortBy];

            if (aValue === undefined || bValue === undefined) return 0;

            // Handle date strings
            if (filters.sortBy.includes('Date') || filters.sortBy.includes('At')) {
                const aDate = new Date(aValue);
                const bDate = new Date(bValue);
                return filters.order === 'asc' ? aDate - bDate : bDate - aDate;
            }

            // Handle strings and other values
            if (filters.order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    },

    // Create New Task
    createTask: async (taskData) => {
        set({ loading: true, error: null });

        try {
            const newTask = await api.createTask(taskData);

            set((state) => ({
                tasks: [newTask, ...state.tasks],
                loading: false
            }));

            return newTask;
        } catch (error) {
            console.error('Error creating task:', error);
            set({
                error: error.message,
                loading: false,
            });
            throw error;
        }
    },

    // Update Existing Task - FIXED: Proper state update
    updateTask: async (id, updates) => {
        set({ loading: true, error: null });

        try {
            const updatedTask = await api.updateTask(id, updates);

            set((state) => ({
                tasks: state.tasks.map(task => task._id === id ? updatedTask : task),
                loading: false
            }));

            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            set({
                error: error.message,
                loading: false,
            });
            throw error;
        }
    },

    // Delete Task - FIXED: Proper state update
    deleteTask: async (id) => {
        set({ loading: true, error: null });

        try {
            await api.deleteTask(id);

            set((state) => ({
                tasks: state.tasks.filter(task => task._id !== id),
                loading: false
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
            set({
                error: error.message,
                loading: false,
            });
            throw error;
        }
    }
}));

export default useTaskStore;