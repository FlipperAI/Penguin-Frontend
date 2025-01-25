"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { HoverBorderGradient } from "../../components/ui/hover-border-gradient";

export default function CodeEditorPage() {
  const [code, setCode] = useState("");
  const [input_data, setInputData] = useState(""); // State for user input
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  const [executionDetails, setExecutionDetails] = useState({
    exit_code: null,
    exec_time: null,
    stderr: "",
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      redirect("/login");
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await axios.post(
        "http://192.168.25.76:8000/submissions/run",
        { code, language, input_data }, // Include input_data in the request payload
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
        {
          signal: AbortSignal.timeout(1000000),
        }
      );

      // Check if the response data is a JSON object or a string
      if (typeof response.data === "object" && response.data !== null) {
        // If it's a JSON object, format it nicely
        setOutput(response.data.stdout || "No output");
        setExecutionDetails({
          exit_code: response.data.exit_code,
          exec_time: response.data.exec_time,
          stderr: response.data.stderr || "",
        });
      } else {
        // If it's a string, display it directly
        setOutput(response.data);
        setExecutionDetails({
          exit_code: null,
          exec_time: null,
          stderr: "",
        });
      }
    } catch (error: any) {
      setOutput(
        error.response?.data?.detail ||
        error.message ||
        "Error: Unable to fetch the result."
      );
      setExecutionDetails({
        exit_code: null,
        exec_time: null,
        stderr: error.response?.data?.detail || error.message || "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Dark theme styles
  const backgroundColor = "bg-gray-900"; // Dark background
  const textColor = "text-white"; // White text
  const borderColor = "border-gray-700"; // Dark border
  const inputBackground = "bg-gray-800"; // Dark input background
  const buttonBackground = "bg-blue-600 hover:bg-blue-700"; // Blue button with hover effect
  const buttonText = "text-white"; // White button text
  const errorColor = "text-red-500"; // Red error text
  const editorTheme = "vs-dark"; // Dark theme for Monaco Editor

  return (
    <div className={`min-h-screen ${backgroundColor} flex flex-col lg:flex-row`}>
      {/* Left Panel: Code Editor */}
      <div
        className={`w-full lg:w-1/2 ${backgroundColor} p-6 border-b lg:border-r ${borderColor}`}
      >
        <div className="mb-4">
          <label
            className={`block ${textColor} text-sm font-bold mb-2`}
            htmlFor="language"
          >
            Select Language:
          </label>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="c">C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label
            className={`block ${textColor} text-sm font-bold mb-2`}
            htmlFor="code"
          >
            Enter Your Code:
          </label>
          <Editor
            height={`${(window.innerHeight * 2) / 5}px`} // Adjusted height for better visibility
            language={language}
            theme={editorTheme} // Dark theme for Monaco Editor
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Input Box for User Input */}
        <div className="mb-4">
          <label
            className={`block ${textColor} text-sm font-bold mb-2`}
            htmlFor="input_data"
          >
            Input for Code:
          </label>
          <textarea
            id="input_data"
            value={input_data}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter input for your code"
            className={`w-full p-2 rounded-lg ${inputBackground} ${textColor} border ${borderColor}`}
            rows={4} // Adjust the number of rows as needed
          />
        </div>

        <div className="flex items-center justify-center">
          <HoverBorderGradient
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full font-medium py-2 rounded-md ${buttonBackground} ${buttonText}`}
          >
            {isLoading ? "Running..." : "Submit Code"}
          </HoverBorderGradient>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div
        className={`w-full lg:w-1/2 ${backgroundColor} p-6 overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${textColor}`}>Output:</h2>
          {executionDetails.exec_time !== null && (
            <p className={`text-sm ${textColor}`}>
              Exit Code: {executionDetails.exit_code} | Execution Time:{" "}
              {executionDetails.exec_time.toFixed(3)} seconds
            </p>
          )}
        </div>

        {/* Output Box */}
        <pre
          className={`bg-gray-800 text-gray-300 p-4 rounded-lg overflow-auto font-mono text-sm mb-4`}
        >
          {output}
        </pre>

        {/* Stderr Box (only shown if there is an error) */}
        {executionDetails.stderr && (
          <div className="mt-4">
            <h3 className={`text-lg font-bold ${textColor} mb-2`}>Error:</h3>
            <pre
              className={`bg-red-900 text-red-200 p-4 rounded-lg overflow-auto font-mono text-sm`}
            >
              {executionDetails.stderr}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
