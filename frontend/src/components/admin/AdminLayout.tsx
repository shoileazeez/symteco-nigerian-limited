"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, User, Menu, X, BarChart3, Wrench, MessageSquare, ChevronUp, Settings } from 'lucide-react';

interface Props {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: Props) {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileUserPanelOpen, setMobileUserPanelOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    // initialize collapsed state from localStorage
    try {
      const stored = localStorage.getItem('adminSidebarCollapsed');
      if (stored) setCollapsed(stored === 'true');
    } catch (e) {
      // ignore
    }
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
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileUserPanelOpen(!mobileUserPanelOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <ChevronUp className={`h-4 w-4 transition-transform duration-300 ${mobileUserPanelOpen ? 'rotate-180' : ''}`} />
            </Button>
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
        
        {/* Mobile User Panel */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileUserPanelOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-primary/10 mt-4">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {user?.name || 'Admin'}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-primary/20 hover:bg-primary/5 transition-all duration-200"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {(sidebarOpen || mobileUserPanelOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => {
            setSidebarOpen(false);
            setMobileUserPanelOpen(false);
          }}
        />
      )}

      <div className="flex">
        <aside className={`
          fixed lg:static lg:translate-x-0 transition-all duration-300 ease-in-out z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'} w-64 bg-white/95 backdrop-blur-sm border-r border-primary/10 h-screen shadow-xl
          transform-gpu will-change-transform
        `}>
          <div className="p-6 md:p-4 border-b border-primary/10 flex items-center justify-between">
            <Link href="/admin/dashboard" className={`flex items-center space-x-2 ${collapsed ? 'justify-center' : 'justify-start'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              {!collapsed && (
                <div>
                  <div className="text-lg font-bold text-primary">Symteco</div>
                  <div className="text-xs text-muted-foreground">Admin Panel</div>
                </div>
              )}
            </Link>

            {/* Desktop collapse toggle */}
            <button
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={() => {
                const next = !collapsed;
                setCollapsed(next);
                try { localStorage.setItem('adminSidebarCollapsed', String(next)); } catch (e) {}
              }}
              className="hidden lg:inline-flex items-center justify-center p-2 rounded-md hover:bg-primary/5 transition-all duration-200 active:scale-95"
            >
              {collapsed ? <Menu className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-primary" />}
            </button>
          </div>
          
          <nav className="p-4 md:p-2 space-y-2">
            <Link href="/admin/dashboard" className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group hover:shadow-md hover:shadow-primary/5 active:scale-95`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <BarChart3 className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors duration-300" />
              </div>
              {!collapsed && <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Dashboard</span>}
            </Link>
            
            <Link href="/admin/projects" className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group hover:shadow-md hover:shadow-primary/5 active:scale-95`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <Wrench className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors duration-300" />
              </div>
              {!collapsed && <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Projects</span>}
            </Link>
            
            <Link href="/admin/messages" className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group hover:shadow-md hover:shadow-primary/5 active:scale-95`}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                <MessageSquare className="h-4 w-4 text-primary group-hover:text-primary/80 transition-colors duration-300" />
              </div>
              {!collapsed && <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">Messages</span>}
            </Link>
          </nav>
          
          {/* User info and logout (responsive) */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="mx-auto max-w-xs lg:max-w-full bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-3 md:p-2 lg:p-4 border border-primary/20">
              <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center'} space-x-0 ${collapsed ? 'space-y-3' : 'space-x-2'} mb-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                {!collapsed ? (
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {user?.name || 'Admin'}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-xs text-muted-foreground w-full">
                    <div className="text-sm font-medium text-foreground">{user?.name || 'Admin'}</div>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm" 
                className={`w-full border-primary/20 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 flex items-center justify-center ${collapsed ? 'px-2 py-2' : ''} hover:shadow-md hover:shadow-primary/10 active:scale-95`}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          </div>
        </aside>

        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${collapsed ? 'lg:ml-0' : 'lg:ml-0'}`}>
          <div className="max-w-7xl mx-auto">
            {title && (
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
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
