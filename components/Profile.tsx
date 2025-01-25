'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p>Email: {session.user?.email}</p>
      <p>Name: {session.user?.name}</p>
    </div>
  );
}