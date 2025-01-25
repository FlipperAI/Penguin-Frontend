"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check for access token in localStorage after the component mounts
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Set true if token exists
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      // Redirect to landing page
      router.push("/landing");

      // Call logout API
      await axios.post(
        "http://192.168.0.252:8000/auth/jwt/logout",
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Clear token from localStorage
      localStorage.removeItem("access_token");
      setIsAuthenticated(false); // Update state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <NextNavbar isBordered>
      {/* Navbar Brand */}
      <NavbarBrand>
        <Link href="/landing" className="flex items-center gap-2">
          <AcmeLogo />
          <p className="font-bold text-inherit">Online Coding Judge</p>
        </Link>
      </NavbarBrand>

      {/* Navbar Links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/landing" className="text-foreground hover:text-gray-200">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/editor" className="text-foreground hover:text-gray-200">
            Editor
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Navbar Actions */}
      <NavbarContent as="div" justify="end">
        {isAuthenticated ? (
          <>
            <Button
              onPress={handleLogout}
              color="danger"
              variant="flat"
              className="hover:bg-red-600 hover:text-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login" className="text-foreground hover:text-gray-200">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/signup" className="text-foreground hover:text-gray-200">
                Sign Up
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextNavbar>
  );
}

// Placeholder Logo Component
const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
