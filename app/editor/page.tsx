'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

export default function CodeEditorPage() {
  const { data: session } = useSession();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python');
  const { theme } = useTheme(); // Get the current theme

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  // Hardcoded question details
  const question = {
    id: 1,
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
    ],
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error: Unable to fetch the result.');
    } finally {
      setIsLoading(false);
    }
  };

  // Define background and text colors based on the theme
  const backgroundColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'; // Monaco Editor theme

  return (
    <div className={`min-h-screen ${backgroundColor} flex flex-col lg:flex-row`}>
      {/* Left Panel: Question Details */}
      <div className={`w-full lg:w-1/4 ${backgroundColor} p-6 border-b lg:border-r ${borderColor} overflow-y-auto`}>
        <h1 className={`text-2xl font-bold mb-4 ${textColor}`}>{question.title}</h1>
        <p className={`${textColor} mb-4`}>{question.description}</p>

        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-2 ${textColor}`}>Examples:</h2>
          {question.examples.map((example, index) => (
            <div key={index} className={`mb-4 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Input:</strong> {example.input}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <strong>Output:</strong> {example.output}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className={`text-lg font-bold mb-2 ${textColor}`}>Constraints:</h2>
          <ul className={`list-disc list-inside text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {question.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle Panel: Code Editor */}
      <div className={`w-full lg:w-1/2 ${backgroundColor} p-6 border-b lg:border-r ${borderColor}`}>
        <div className="mb-4">
          <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="language">
            Select Language:
          </label>
          <Select value={language} onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-full lg:w-48">
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

        <div className="mb-4">
          <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="code">
            Enter Your Code:
          </label>
          <Editor
            height="400px" // Adjusted height for better responsiveness
            language={language}
            theme={editorTheme} // Set Monaco Editor theme dynamically
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

      {/* Right Panel: Output */}
      <div className={`w-full lg:w-1/4 ${backgroundColor} p-6 overflow-y-auto`}>
        <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Output:</h2>
        <pre className={`${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} p-4 rounded-lg overflow-auto font-mono text-sm`}>
          {output}
        </pre>
      </div>
    </div>
  );
}