import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// Create A New Task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, dueDate, customFields } = req.body;

    if (!title || title.trim().length === 0) {
        throw new ApiError(400, "Task Title Is Required!!");
    }

    if (status) {
        const validStatuses = ["To Do", "In Progress", "Done"];
        if (!validStatuses.includes(status)) {
            throw new ApiError(400, `Invalid Status! Must Be One Of ${validStatuses.join(", ")}`);
        }
    }

    if (dueDate && new Date(dueDate) < new Date()) {
        throw new ApiError(400, "Due Date Cannot Be In The Past!!");
    }

    const task = await Task.create({
        title: title.trim(),
        description: description?.trim() || "",
        status: status || "To Do",
        dueDate: dueDate ? new Date(dueDate) : undefined,
        customFields: customFields || {}
    })

    return res.status(201).json(
        new ApiResponse(201, task, "Task Created Successfully!!")
    );
})

// Get All Tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const { status, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    // Filter Object
    const filter = {};

    if (status) {
        const validStatuses = ["To Do", "In Progress", "Done"];
        if (validStatuses.includes(status)) {
            filter.status = status;
        } else {
            throw new ApiError(400, `Invalid Status! Must Be One Of ${validStatuses.join(", ")}`);
        }
    }

    // Sort Object
    const sortOrder = order === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    // Calculate Pagination
    const skipPages = (parseInt(page) - 1) * parseInt(limit);

    // Execute Query
    const tasks = await Task.find(filter)
        .sort(sort)
        .skip(skipPages)
        .limit(parseInt(limit))

    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / parseInt(limit));

    return res.status(200).json(
        new ApiResponse(200,
            {
                tasks,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalTasks,
                    hasNextPage: parseInt(page) < totalPages,
                    hasPrevPage: parseInt(page) > 1
                }
            },
            "Tasks Retrieved Successfully!!"
        )
    )
});

// Get A Task By Id
const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Id Format!!");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(400, "Task Not Found!!");
    }

    return res.status(200)
        .json(new ApiResponse(200, task, "Task Retreived Successfully!!"));
})

// Update An Existing Task
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate, customFields } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task Id Format!!");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(400, "Task Not Found!!");
    }

    const updateData = {};

    if (title !== undefined) {
        if (!title || title.trim().length === 0) {
            throw new ApiError(400, "Task title cannot be empty");
        }
        updateData.title = title.trim();
    }

    if (description !== undefined) {
        updateData.description = description?.trim() || "";
    }

    if (status !== undefined) {
        const validStatuses = ["To Do", "In Progress", "Done"];
        if (!validStatuses.includes(status)) {
            throw new ApiError(400, `Invalid Status! Must Be One Of These - ${validStatuses.join(", ")}`);
        }
        updateData.status = status;
    }

    if (dueDate !== undefined) {
        if (dueDate === null || dueDate === "") {
            updateData.dueDate = null;
        } else {
            const parsedDate = new Date(dueDate);
            if (isNaN(parsedDate.getTime())) {
                throw new ApiError(400, "Invalid Due Date Format!!");
            }
            updateData.dueDate = parsedDate;
        }
    }

    if (customFields !== undefined) {
        updateData.customFields = customFields || {};
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    return res.status(200)
        .json(new ApiResponse(200, updatedTask, "Task Updated Successfully!!"));
})

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task Id Format!!");
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
        throw new ApiError(400, "Task Not Found!!");
    }

    return res.status(200)
        .json(new ApiResponse(200, deletedTask, "Task Deleted Successfully!!"));
})

export {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};