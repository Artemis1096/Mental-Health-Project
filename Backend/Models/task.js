import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    date: {
        type: Date,
        required: true,
        set: (val) => new Date(val).setHours(0, 0, 0, 0), // Store only the date
        get: (val) => new Date(val).toISOString().split("T")[0], // Retrieve only date part
      },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;  

