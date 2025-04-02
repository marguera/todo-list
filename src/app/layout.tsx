import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createTodosTable } from '@/lib/db';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo List App',
  description: 'A simple todo list app built with Next.js, Tailwind CSS and Vercel Postgres',
};

// Initialize the database table
createTodosTable().catch(console.error);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
