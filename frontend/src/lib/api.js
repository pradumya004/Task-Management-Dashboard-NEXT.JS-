import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./constants.js";

// Create axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor to handle errors and extract data
apiClient.interceptors.response.use(
    (response) => {
        // Extract data from your backend response structure
        // Backend returns: { statusCode, data, message, success }
        return response.data.data || response.data;
    },
    (error) => {
        // Handle errors from your backend
        let message = 'Something went wrong';

        if (error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }

        console.error('API Error:', message);
        throw new Error(message);
    }
);

export const api = {
    // Health check
    health: async () => {
        const response = await apiClient.get(API_ENDPOINTS.health);
        return response;
    },

    // GET /api/tasks - get all tasks with optional filters
    getTasks: async (filters = {}) => {
        const response = await apiClient.get(API_ENDPOINTS.tasks, {
            params: filters, // axios automatically converts to query string
        });

        // Handle pagination response from backend
        if (response && response.tasks) {
            return response.tasks; // Return just the tasks array
        }

        return response || [];
    },

    // GET /api/tasks/:id - get single task
    getTask: async (id) => {
        const response = await apiClient.get(`${API_ENDPOINTS.tasks}/${id}`);
        return response;
    },

    // POST /api/tasks - create new task
    createTask: async (taskData) => {
        const response = await apiClient.post(API_ENDPOINTS.tasks, taskData);
        return response;
    },

    // PUT /api/tasks/:id - update task
    updateTask: async (id, updates) => {
        const response = await apiClient.put(`${API_ENDPOINTS.tasks}/${id}`, updates);
        return response;
    },

    // DELETE /api/tasks/:id - delete task
    deleteTask: async (id) => {
        const response = await apiClient.delete(`${API_ENDPOINTS.tasks}/${id}`);
        return response;
    }
};