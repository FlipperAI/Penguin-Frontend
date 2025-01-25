'use client'; // Mark as a Client Component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@monaco-editor/react';

export default function CodeEditorPage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python'); // Default language

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }), // Send language to the backend
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error: Unable to fetch the result.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Online Coding Judge</h1>

        {/* Language Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
            Select Language:
          </label>
          <Select value={language} onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Code Editor */}
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              Enter Your Code:
            </label>
            <Editor
              height="400px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {isLoading ? 'Running...' : 'Submit Code'}
            </Button>
          </div>
        </div>

        {/* Output Section */}
        {output && (
          <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Output:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto font-mono text-sm text-gray-700">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}