import Task from "../Models/task.js";
import User from "../Models/User.js";


export const createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.user._id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id }); 
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
      
        const existingTask = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!existingTask) return res.status(404).json({ message: "Task not found" });

       
        const isNewlyCompleted = req.body.status === "completed" && existingTask.status !== "completed";

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        let updatedUser = null;

        if (isNewlyCompleted) {
            updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { $inc: { exp: 10 } }, 
                { new: true }
            );
        }

        res.status(200).json({
            task: updatedTask,
            exp: updatedUser ? updatedUser.exp : undefined, 
            message: "Task updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message,
            success:false
         });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id }); 
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
