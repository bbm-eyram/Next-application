'use client';

import { useState, useEffect } from 'react';

// Define a type for the user structure
type User = {
  id: number;
  name: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul className='space-y-4 p-4 bg-gray-700'>
        {users.map((user) => (
          <li key={user.id}>
            <p className='text-center p-4 bg-white shadow-md rounded-lg text-gray-700'>
              <strong>{user.name}</strong> - {user.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
