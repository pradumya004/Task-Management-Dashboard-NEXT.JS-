import { Router } from "express";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask
} from "../controllers/task.controllers.js";

const router = Router();

// Get Routes
router.route("/").get(getAllTasks);
router.route("/:id").get(getTaskById);

// Post Routes
router.route("/").post(createTask);

// Put Routes
router.route("/:id").put(updateTask);

// Delete Routes
router.route("/:id").delete(deleteTask)

export default router;