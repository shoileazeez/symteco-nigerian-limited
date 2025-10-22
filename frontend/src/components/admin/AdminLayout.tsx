"use client";

import React, { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to admin login if not authenticated
      router.push('/admin/login');
    }
  }, [status, router]);

  // While loading session, render a placeholder to avoid calling hooks during SSR
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If unauthenticated, don't render children (useEffect will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r h-screen sticky top-0">
          <div className="p-6">
            <Link href="/admin" className="text-lg font-bold">
              Admin
            </Link>
          </div>
          <nav className="p-4 space-y-2">
            <Link href="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link href="/admin/projects" className="block px-4 py-2 rounded hover:bg-gray-100">Projects</Link>
            <Link href="/admin/messages" className="block px-4 py-2 rounded hover:bg-gray-100">Messages</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {title && <h1 className="text-2xl font-semibold mb-6">{title}</h1>}
          {children}
        </main>
      </div>
    </div>
  );
}
