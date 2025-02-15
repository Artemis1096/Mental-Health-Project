import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/HomePage.css";

const TaskList = () => {
  // State to store tasks, loading, error, new task data, and add-task status.
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [adding, setAdding] = useState(false);
  
  // Fetch all tasks when the component mounts.
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend.
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/tasks/getall", {
        withCredentials: true,
      });
      setTasks(response.data);
      console.log("Fetched tasks:", response.data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark a task as completed and increase user EXP by 5.
  const completeTask = async (id) => {
    console.log(`Completing task: ${id}`);
    try {
      await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        { status: "completed" },
        { withCredentials: true }
      );
      // Update the local state to mark the task as completed.
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, status: "completed" } : task
        )
      );

      // Increase the user's EXP by 5.
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.exp = (userData.exp || 0) + 5;
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      console.error("Failed to update task", err);
      setError("Failed to update task");
    }
  };

  // Delete a task.
  const deleteTask = async (id) => {
    console.log(`Deleting task: ${id}`);
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        withCredentials: true,
      });
      // Update the tasks state by filtering out the deleted task.
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
      setError("Failed to delete task");
    }
  };

  // Add a new task.
  const addTask = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      // POST request to add a new task.
      const response = await axios.post(
        "http://localhost:8000/api/tasks/create",
        newTask,
        { withCredentials: true }
      );
      // Append the new task to the local state.
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      // Clear the form fields after successful addition.
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Failed to add task", err);
      setError("Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  // Show loading or error message.
  if (loading) return <p className="text-center text-gray-600">Loading tasks...</p>;
  if (error) return <p className="text-center text-black">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 task-list w-full">
      <h2 className="text-6xl text-center font-bold mb-4">Task List</h2>

      {/* Form to add a new task */}
      <form onSubmit={addTask} className="mb-6 p-4 border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Add New Task</h3>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={adding}
          className="px-4 py-2 task-btn text-white rounded-lg"
        >
          {adding ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* List of tasks */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 border rounded-lg shadow-md flex justify-between items-center mb-4"
          >
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-white">{task.description}</p>
              <p className="text-sm text-white">{task.status}</p>
            </div>
            <div className="flex gap-2">
              {task.status !== "completed" && (
                <button
                  onClick={() => completeTask(task._id)}
                  className="px-3 py-2 text-white task-btn rounded-lg"
                >
                  Task Completed
                </button>
              )}
              <button
                onClick={() => deleteTask(task._id)}
                className="px-3 py-2 text-white task-btn rounded-lg"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
