import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Online Coding Judge
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Run your code in isolated Docker containers and get real-time results.
        </p>
        <Link href="/editor">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Start Coding Now
          </Button>
        </Link>
      </div>

      {/* Key Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Secure Execution</h2>
          <p className="text-gray-600">
            Your code runs in isolated Docker containers, ensuring security and reliability.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Real-Time Output</h2>
          <p className="text-gray-600">
            Get instant feedback on your code with real-time output and error messages.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Scalable Infrastructure</h2>
          <p className="text-gray-600">
            Built to handle multiple submissions simultaneously with dynamic resource allocation.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2023 Online Coding Judge. All rights reserved.</p>
      </footer>
    </div>
  );
}