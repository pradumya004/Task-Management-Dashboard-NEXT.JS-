import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine tailwind classes properly
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format Dates - (Month Date, Year)
export const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (error) {
        console.error("Error Formatting Date! ::::::> ", error);
        return '';
    }
};

// Check For Overdue Task
export const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'Done') return false;

    try {
        const due = new Date(dueDate);
        const now = new Date();
        return due < now;
    } catch (error) {
        console.error("Error Checking Overdue Task! ::::::> ", error);
        return false;
    }
};

// Truncate Long Texts
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
};

// Capitalize First Letter
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// ADDED: Array utilities for Kanban board
export const arrayUtils = {
    // Group array of objects by a key
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
            return groups;
        }, {});
    }
};