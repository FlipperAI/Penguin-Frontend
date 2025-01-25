'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes'; // Import useTheme from next-themes

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useTheme(); // Get the current theme

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/editor');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Define theme-based styles
  const isDarkMode = theme === 'dark';
  const background = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const cardBackground = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBackground = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const buttonBackground = isDarkMode ? 'bg-gray-800 hover:bg-gray-500' : 'bg-gray-900 hover:bg-gray-800';
  const buttonText = isDarkMode ? 'text-white' : 'text-white';
  const errorColor = 'text-red-500'; // Error color remains the same for visibility
  const linkColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';

  return (
    <div className={`min-h-screen flex items-center justify-center ${background}`}>
      <div className={`p-8 rounded-lg shadow-sm w-96 border ${cardBackground} ${borderColor}`}>
        <h1 className={`text-2xl font-bold mb-6 text-center ${textPrimary}`}>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${textSecondary}`} htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full ${inputBackground} ${textPrimary} border ${borderColor}`}
              required
            />
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${textSecondary}`} htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full ${inputBackground} ${textPrimary} border ${borderColor}`}
              required
            />
          </div>
          {error && <p className={`text-sm mb-4 ${errorColor}`}>{error}</p>}
          <Button
            type="submit"
            className={`w-full font-medium py-2 rounded ${buttonBackground} ${buttonText}`}
          >
            Log In
          </Button>
        </form>
        <p className={`text-center mt-6 text-sm ${textSecondary}`}>
          Don't have an account?{' '}
          <Link href="/signup" className={`hover:underline ${linkColor}`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}