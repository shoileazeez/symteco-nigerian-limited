"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, User, Menu, X } from 'lucide-react';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: Props) {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      // Redirect to admin login if not authenticated
      router.push('/admin/login');
    }
  }, [mounted, loading, user, router]);

  const handleLogout = async () => {
    try {
      logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // While loading user, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If unauthenticated, don't render children (useEffect will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-primary/10 p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">Symteco</div>
              <div className="text-xs text-muted-foreground">Admin Panel</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <aside className={`
          fixed lg:static lg:translate-x-0 transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 lg:w-64 bg-white/95 backdrop-blur-sm border-r border-primary/10 h-screen shadow-xl
        `}>
          <div className="p-6 md:p-4 border-b border-primary/10">
            <Link href="/admin" className="flex items-center space-x-2 md:justify-center lg:justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="md:hidden lg:block">
                <div className="text-lg font-bold text-primary">Symteco</div>
                <div className="text-xs text-muted-foreground">Admin Panel</div>
              </div>
            </Link>
          </div>
          
          <nav className="p-4 md:p-2 space-y-2">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 md:justify-center lg:justify-start px-4 md:px-2 lg:px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary text-sm">📊</span>
              </div>
              <span className="font-medium text-foreground md:hidden lg:block">Dashboard</span>
            </Link>
            
            <Link href="/admin/projects" className="flex items-center space-x-3 md:justify-center lg:justify-start px-4 md:px-2 lg:px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary text-sm">🏗️</span>
              </div>
              <span className="font-medium text-foreground md:hidden lg:block">Projects</span>
            </Link>
            
            <Link href="/admin/messages" className="flex items-center space-x-3 md:justify-center lg:justify-start px-4 md:px-2 lg:px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary text-sm">💬</span>
              </div>
              <span className="font-medium text-foreground md:hidden lg:block">Messages</span>
            </Link>
          </nav>
          
          {/* User info and logout */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 md:p-2 lg:p-4 border border-primary/20">
              <div className="flex items-center space-x-2 mb-3 md:justify-center lg:justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 md:hidden lg:block">
                  <div className="text-sm font-medium text-foreground truncate">
                    {user?.name || 'Admin'}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm" 
                className="w-full border-primary/20 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300"
              >
                <LogOut className="h-4 w-4 md:mr-0 lg:mr-2" />
                <span className="md:hidden lg:inline">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {title && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {title}
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"></div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
