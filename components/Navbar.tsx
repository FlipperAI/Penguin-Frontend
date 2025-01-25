'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear access token
    router.push('/login'); // Redirect to login page
  };

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering until mounted
  }

  return (
    <NextNavbar isBordered>
      <NavbarBrand>
        <Link href="/landing" className="flex items-center gap-2">
          <AcmeLogo />
          <p className="font-bold text-inherit">Online Coding Judge</p>
        </Link>
      </NavbarBrand>

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

      <NavbarContent as="div" justify="end">
        {/* Theme Toggle Button */}
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </Button>

        {/* Logout Button (Visible when authenticated) */}
        {status === 'authenticated' && (
          <NavbarItem>
            <Button
              onPress={handleLogout}
              color="danger"
              variant="flat"
              className="hover:bg-red-600 hover:text-white"
            >
              Logout
            </Button>
          </NavbarItem>
        )}

        {/* User Dropdown */}
        {status === 'authenticated' ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session.user?.email || 'User'}
                size="sm"
                src={session.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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

// AcmeLogo Component (Placeholder for your logo)
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