import { useEffect, useState } from 'react';

const StaffDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/staff/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('An unexpected error occurred');
      }
    };

    fetchTasks();
  }, []);

  const handleTaskResolve = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/staff/tasks/${taskId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, resolved: true } : task));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Staff Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.report} {task.resolved ? '✅' : <button onClick={() => handleTaskResolve(task.id)}>Resolve</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffDashboard;
