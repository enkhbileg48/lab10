import { useState, useEffect } from 'react';
import axios from 'axios';  

const StaffDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        setError('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  const resolveTask = async (taskId) => {
    try {
      console.log(taskId);
      await axios.post(`/api/resolve-task/${taskId}`);
      setTasks(tasks.map(task => task.task_id === taskId ? { ...task, task_status_id: 1, resolved_date: new Date() } : task));
    } catch (error) {
      setError('Error resolving task');
    }
  };

  return (
    <div>
      <h1>Staff Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority ? task.priority.description : 'No priority'}</p>
            <p>Status: {task.task_status ? task.task_status.description : 'Not resolved'}</p>
            <button onClick={() => resolveTask(task.task_id)} disabled={task.task_status_id === 1}>
              {task.task_status_id === 1 ? 'Resolved' : 'Resolve'}
            </button>
            {task.resolved_date && <p>Resolved Date: {new Date(task.resolved_date).toLocaleString()}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffDashboard;
