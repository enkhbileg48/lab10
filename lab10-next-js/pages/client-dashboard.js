import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ClientDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const router = useRouter();
  const clientId = 1; // Logical error

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/client-tasks?clientId=${clientId}`);
        const data = await response.json();
        // Array data
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Unexpected response format:", data);
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/client-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, description }),
      });

      if (response.ok) {
        const newTask = await response.json();

        // task state update
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setDescription('');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Task Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      <h2>Your Tasks</h2>
      <ul>
        {Array.isArray(tasks) && tasks.map((task) => (
          <li key={task.task_id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
