// Backend API URL
export const API_BASE_URL = 'http://localhost:8000/api';

// API Endpoints - According To Backend Routes
export const API_ENDPOINTS = {
    tasks: '/tasks',
    health: '/health',
};

// Task Status Options - According To Backend Model
export const TASK_STATUSES = ['To Do', 'In Progress', 'Done'];

// Colors & Styles For Status - FIXED: Better color scheme
export const STATUS_CONFIG = {
    'To Do': {
        color: 'bg-gray-100 text-gray-800',
        dotColor: 'bg-gray-400',
    },
    'In Progress': {
        color: 'bg-yellow-100 text-yellow-800',
        dotColor: 'bg-yellow-400',
    },
    'Done': {
        color: 'bg-green-100 text-green-800',
        dotColor: 'bg-green-400',
    },
};

// Number Of Tasks Per Page
export const TASKS_PER_PAGE = 10;

// Form Validation Messages
export const VALIDATION_MESSAGES = {
    TASK_CREATED: 'Task Created Successfully!',
    TASK_UPDATED: 'Task Updated Successfully!',
    TASK_DELETED: 'Task Deleted Successfully!',
    ERROR_LOADING: 'Error Loading Task(s)!',
    ERROR_SAVING: 'Error Saving Task!',
};