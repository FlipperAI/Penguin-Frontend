"use client";

import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LaunchUI from "@/components/logos/launch-ui";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
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

      // Call logout API
      await axios.post(
        "http://192.168.134.252:8000/auth/jwt/logout",
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.removeItem("access_token") 

      // Clear token and update state
      setIsAuthenticated(false);
      router.push("/login");
      

      // Redirect to landing page
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-24 w-full bg-background/15 backdrop-blur-lg"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a href="/landing" className="flex items-center gap-2 text-xl font-bold">
              <LaunchUI />
              TuxCode
            </a>
            <Navigation />
          </NavbarLeft>
          <NavbarRight>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="default" asChild>
                  <a href="/editor">Editor</a>
                </Button>
              </>
            ) : (
              <>
                <a href="/login" className="hidden text-sm md:block">
                  Sign in
                </a>
                <Button variant="default" asChild>
                  <a href="/signup">Get Started</a>
                </Button>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>TuxCode</span>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
