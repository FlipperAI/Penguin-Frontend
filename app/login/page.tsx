'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes'; // Import useTheme from next-themes
import axios from 'axios'; // Import axios

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useTheme(); // Get the current theme

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Define the URL-encoded data
      const data = new URLSearchParams();
      data.append('username', email);
      data.append('password', password);
      data.append('grant_type', 'password'); // Add other required fields if needed
      data.append('scope', '');
      data.append('client_id', 'string'); // Replace with actual client_id
      data.append('client_secret', 'string'); // Replace with actual client_secret

      // Send a POST request using axios
      const response = await axios.post('http://192.168.25.241:8000/auth/jwt/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.status === 200) {
        // Log the user info (or handle it as needed)
        console.log('User info:', response.data);

        // Store the access_token in localStorage
        localStorage.setItem('access_token', response.data.access_token);

        // Redirect to the editor page after successful login
        router.push('/editor');
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  // Define theme-based styles
  const isDarkMode = theme === 'dark';
  const background = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'; // Softer light background
  const cardBackground = isDarkMode ? 'bg-gray-700' : 'bg-slate'; // Subtle gray for dark mode
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'; // Softer secondary text
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300'; // Softer border color
  const inputBackground = isDarkMode ? 'bg-gray-800' : 'bg-gray-100'; // Subtle background for inputs
  const buttonBackground = isDarkMode ? 'bg-black-700 hover:bg-blue-600' : 'bg-zinc-900 hover:bg-zinc-400'; // Softer button hover
  const buttonText = 'text-white'; // Keep button text white for visibility
  const errorColor = 'text-red-500'; // Error color remains the same for visibility
  const linkColor = isDarkMode ? 'text-blue-400' : 'text-blue-600'; // Slightly lighter for visibility

  return (
    <div className={`min-h-screen flex items-center justify-center ${background}`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 border ${cardBackground} ${borderColor}`}>
        <h1 className={`text-2xl font-semibold mb-6 text-center ${textPrimary}`}>Log In</h1>
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
              className={`w-full ${inputBackground} ${textPrimary} border ${borderColor} rounded-md py-2 px-4`}
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
              className={`w-full ${inputBackground} ${textPrimary} border ${borderColor} rounded-md py-2 px-4`}
              required
            />
          </div>
          {error && <p className={`text-sm mb-4 ${errorColor}`}>{error}</p>}
          <Button
            type="submit"
            className={`w-full font-medium py-2 rounded-md ${buttonBackground} ${buttonText}`}
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
