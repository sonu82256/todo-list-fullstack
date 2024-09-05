import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        task: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
