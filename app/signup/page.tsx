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

export default function SignupPage() {
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
      const payload = {
        email,
        password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
      };

      const response = await axios.post(
        "http://172.210.29.213:8000/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("User created:", response.data);
        router.push("/login");
      } else {
        throw new Error("Signup failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed. Please try again.");
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
          Create Your Account
        </h2>
        <p className={`${textSecondary} mb-6`}>
          Sign up to get started with TuxCode.
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
            Sign Up
          </button>

          <div className="my-6 border-t border-gray-600" />

          <div className="flex flex-col space-y-4">
            <button
              className={`${inputBackground} ${textPrimary} flex items-center justify-center py-2 rounded-md`}
              type="button"
            >
              <IconBrandGithub className="mr-2" />
              Sign Up with GitHub
            </button>
            <button
              className={`${inputBackground} ${textPrimary} flex items-center justify-center py-2 rounded-md`}
              type="button"
            >
              <IconBrandGoogle className="mr-2" />
              Sign Up with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className={textSecondary}>
              Already have an account?{" "}
              <Link href="/login" className={linkColor}>
                Log In
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
