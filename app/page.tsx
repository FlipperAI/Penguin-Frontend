'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  useEffect(() => {
    // Check for access_token in localStorage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Redirect to login if no access token is found
      redirect('/login');
    } else {
      // Redirect to editor if access token is found
      redirect('/editor');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Online Coding Judge</h1>
      <p>Loading...</p>
    </div>
  );
}