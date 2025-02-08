// TaskList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  // State variables for tasks, new task input, loading state and error message
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from the backend on component mount
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:8000/api/tasks/getall');
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Error fetching tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handler to create a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      // Assuming a new task needs at least a title and a default status (e.g., "pending")
      const { data } = await axios.post('http://localhost:8000/api/tasks/', {
        title: newTaskTitle,
        status: 'pending',
      });
      // Append the new task to the existing tasks array
      setTasks([...tasks, data]);
      setNewTaskTitle('');
    } catch (err) {
      console.error(err);
      setError('Error creating task');
    }
  };

  // Handler to mark a task as completed.
  // This sends an update request; note that if the task status is updated to "completed" and was not already,
  // the backend will also increment the user's experience.
  const handleCompleteTask = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === 'completed') return;
    try {
      // Update the task status to "completed"
      const { data } = await axios.put(`/api/tasks/${taskId}`, { status: 'completed' });
      // The response returns an object with the updated task under "task"
      const updatedTask = data.task;
      setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)));
    } catch (err) {
      console.error(err);
      setError('Error updating task');
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      setError('Error deleting task');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Form to create a new task */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          style={{ padding: '0.5rem', width: '70%' }}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add Task
        </button>
      </form>

      {/* Loading state */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                {task.title} ({task.status})
              </span>
              <div>
                {/* Show the "Complete" button only if the task is not yet completed */}
                {task.status !== 'completed' && (
                  <button onClick={() => handleCompleteTask(task._id)} style={{ marginRight: '0.5rem' }}>
                    Complete
                  </button>
                )}
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
