import { useEffect, useState } from 'react';

const ClientDashboard = () => {
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!report) {
      setError('Report cannot be empty');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/client/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ report }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Report submitted successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="report">Report:</label>
          <textarea
            id="report"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default ClientDashboard;
