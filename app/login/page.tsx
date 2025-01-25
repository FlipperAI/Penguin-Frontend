"use client";

import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      redirect("/editor");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);
      data.append("grant_type", "password");
      data.append("scope", "");
      data.append("client_id", "string"); // Replace with actual client_id
      data.append("client_secret", "string"); // Replace with actual client_secret

      const response = await axios.post(
        "http://192.168.25.76:8000/auth/jwt/login",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("User info:", response.data);
        localStorage.setItem("access_token", response.data.access_token);
        router.push("/editor");
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError("Login failed. Please check your credentials.");
    }
  };

  // Styling variables
  const background = "bg-gray-900";
  const cardBackground = "bg-gray-800";
  const textPrimary = "text-white";
  const textSecondary = "text-gray-300";
  const borderColor = "border-gray-700";
  const inputBackground = "bg-gray-700";
  const buttonBackground = "bg-blue-600 hover:bg-blue-700";
  const buttonText = "text-white";
  const errorColor = "text-red-500";
  const linkColor = "text-blue-400 hover:text-blue-300";

  return (
    <div
      className={`${background} min-h-screen flex items-center justify-center`}
    >
      <div
        className={`${cardBackground} max-w-md w-full rounded-lg p-6 shadow-lg`}
      >
        <h2 className={`${textPrimary} text-2xl font-bold mb-4`}>
          Welcome to TuxCode
        </h2>
        <p className={`${textSecondary} mb-6`}>
          Login to TuxCode if you can because we don't have a login flow yet.
        </p>

        <form onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className={textSecondary}>
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="yourname@example.com"
              type="email"
              className={`${inputBackground} ${textPrimary} ${borderColor} rounded-md`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className={textSecondary}>
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className={`${inputBackground} ${textPrimary} ${borderColor} rounded-md`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          {error && <p className={`${errorColor} mb-4`}>{error}</p>}

          <button
            className={`${buttonBackground} ${buttonText} w-full py-2 rounded-md font-medium`}
            type="submit"
          >
            Login
          </button>

          <div className="my-6 border-t border-gray-600" />

          <div className="flex flex-col space-y-4">
            <button
              className={`${inputBackground} ${textPrimary} flex items-center justify-center py-2 rounded-md`}
              type="button"
            >
              <IconBrandGithub className="mr-2" />
              Login with GitHub
            </button>
            <button
              className={`${inputBackground} ${textPrimary} flex items-center justify-center py-2 rounded-md`}
              type="button"
            >
              <IconBrandGoogle className="mr-2" />
              Login with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className={textSecondary}>
              Don't have an account?{" "}
              <Link href="/signup" className={linkColor}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};
