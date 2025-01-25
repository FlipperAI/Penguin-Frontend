'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const { data: session } = useSession();

  if (!session) {
    redirect('/login');
  }else{
    redirect('/editor');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Online Coding Judge</h1>
      <p>You are logged in as {session?.user?.email}.</p>
    </div>
  );
}