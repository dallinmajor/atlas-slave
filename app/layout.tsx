import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '../src/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atlas Slave',
  description: 'Official site for Atlas Slave',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}