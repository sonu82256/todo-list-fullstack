import mongoose from "mongoose";
import Task from "../model/task.model.js";
import User from "../model/user.model.js";

export const addTask = async (req, res) => {
    const { userId, task } = req.body;
    if(task.length <= 0) return res.json({message : "Task should not be empty"})
    try {
        const validUser = await User.findById(userId);
        
        if (!validUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTask = new Task({ userId, task });
        await newTask.save();

        return res
            .status(201)
            .json({ message: "Task added successfully", newTask });
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteTask = async (req, res) => {
    console.log(req.params.id)
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.send("error deleting task", error)
    }
};

export const getTask = async (req, res) => {
    const { userId } = req.body;
    console.log(userId)
    // res.send(userId)

    try {
        const validUser = await User.findById(userId);
        if (!validUser) {
            return res.json({ message: "user not found" });
        }

        const task = await Task.find({ userId });
        console.log(task);
        res.send(task);
    } catch (error) {
        res.send("error fetching task", error);
    }
};
