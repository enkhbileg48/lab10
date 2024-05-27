// index.js

import Link from 'next/link';

const IndexPage = () => {
  return (
    <div>
      <h1>Laboratory 10</h1>
      <h2>Register as:</h2>
      <ul>
        <li>
          <Link href="/client-registration">
            Client
          </Link>
        </li>
        <li>
          <Link href="/staff-registration">
            Staff
          </Link>
        </li>
      </ul>
      <h2>Already have an account?</h2>
      <p>
        <Link href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default IndexPage;