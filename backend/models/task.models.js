import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
        maxLength: [100, "Title cannot exceed 100 characters"],
        minLength: [1, "Title cannot be empty"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description cannot exceed 500 characters"],
        default: ""
    },
    status: {
        type: String,
        enum: {
            values: ["To Do", "In Progress", "Done"],
            message: "Status must be either 'To Do', 'In Progress', or 'Done'"
        },
        default: "To Do"
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                // Allow null/undefined, but if provided, validate it's a proper date
                return value === null || value === undefined || value instanceof Date;
            },
            message: "Due date must be a valid date"
        }
    },
    customFields: {
        type: Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true,
});

taskSchema.index({ status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ createdAt: -1 });

taskSchema.virtual('isOverdue').get(function () {
    return this.dueDate < new Date() && this.status !== 'Done';
})

taskSchema.set('toJSON', { virtuals: true })

taskSchema.pre('save', function(next) {
    if (this.title && this.title.trim().length === 0) {
        this.title = undefined; // This will trigger the required validation
    }
    next();
});

export const Task = model("Task", taskSchema, "tasks");