'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import axios from 'axios';

export default function CodeEditorPage() {
  const [code, setCode] = useState('');
  const [input_Data, setinput_Data] = useState(''); // State for user input_Data
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python');
  const { theme } = useTheme();

  // Redirect to login if not authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      redirect('/login');
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found. Please log in.');
      }

      const response = await axios.post(
        'http://192.168.25.241:8000/submissions/run',
        { code, language, input_Data }, // Include input_Data in the request payload
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Set the output from the response
      if (response.data) {
        setOutput(JSON.stringify(response.data, null, 2)); // Pretty-print JSON output
      } else {
        setOutput('No output or message received from the server.');
      }
    } catch (error: any) {
      setOutput(
        error.response?.data?.detail || error.message || 'Error: Unable to fetch the result.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Theme-based styles
  const backgroundColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light';

  return (
    <div className={`min-h-screen ${backgroundColor} flex flex-col lg:flex-row`}>
      {/* Left Panel: Code Editor */}
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
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="code">
            Enter Your Code:
          </label>
          <Editor
            height={`${(window.innerHeight * 2) / 5}px`} // Adjusted height for better visibility
            language={language}
            theme={editorTheme}
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* input_Data Box for User input_Data */}
        <div className="mb-4">
          <label className={`block ${textColor} text-sm font-bold mb-2`} htmlFor="input_Data">
            input_Data for Code:
          </label>
          <textarea
            id="input_Data"
            value={input_Data}
            onChange={(e) => setinput_Data(e.target.value)}
            placeholder="Enter input_Data for your code"
            className={`w-full p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${borderColor}`}
            rows={4} // Adjust the number of rows as needed
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
      <div className={`w-full lg:w-1/2 ${backgroundColor} p-6 overflow-y-auto`}>
        <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Output:</h2>
        <pre
          className={`${
            theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
          } p-4 rounded-lg overflow-auto font-mono text-sm whitespace-pre-line`} 
        >
          {output}
        </pre>
      </div>
    </div>
  );
}