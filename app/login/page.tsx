'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import axios from 'axios'; // Import axios

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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

  // Dark theme styles
  const background = 'bg-gray-900'; // Dark background
  const cardBackground = 'bg-gray-800'; // Dark card background
  const textPrimary = 'text-white'; // White text
  const textSecondary = 'text-gray-300'; // Light gray text
  const borderColor = 'border-gray-700'; // Dark border
  const inputBackground = 'bg-gray-700'; // Dark input background
  const buttonBackground = 'bg-blue-600 hover:bg-blue-700'; // Blue button with hover effect
  const buttonText = 'text-white'; // White button text
  const errorColor = 'text-red-500'; // Red error text
  const linkColor = 'text-blue-400 hover:text-blue-300'; // Blue link with hover effect

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