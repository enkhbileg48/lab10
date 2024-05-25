import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Report() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('User not authenticated');
      return;
    }

    const { userId } = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get userId

    try {
      const response = await axios.post('/api/client/report', {
        userId,
        content, // Sending content instead of report
      });

      setMessage(response.data.message);
      setContent(''); // Clear the form
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Submit a Report</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your report here"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
