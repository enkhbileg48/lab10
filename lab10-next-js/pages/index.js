// index.js

import Link from 'next/link';

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to Our Application!</h1>
      <h2>Register as:</h2>
      <ul>
        <li>
          <Link href="/client-registration">
            <a>Client</a>
          </Link>
        </li>
        <li>
          <Link href="/staff-registration">
            <a>Staff</a>
          </Link>
        </li>
      </ul>
      <h2>Already have an account?</h2>
      <p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  );
};

export default IndexPage;
