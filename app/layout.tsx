'use client'

import './globals.css';
import Navbar from '@/components/Navbar';
import Provider from '@/providers/SessionProvider';
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noNavbarRoutes = ['/','/login','signup', '/landing'];

  // Check if the current route is in the noNavbarRoutes array
  const showNavbar = !noNavbarRoutes.includes(pathname);
  
  console.log(pathname)
  console.log(showNavbar)
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>
            {showNavbar && <Navbar />} {/* Add Navbar if needed */}
            <main className="container mx-auto p-4">{children}</main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}