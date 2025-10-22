import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Mail, 
  LogOut, 
  Settings,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Add Project', href: '/admin/projects/add', icon: PlusCircle },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-primary">
              Symteco Admin
            </h1>
            <p className="text-sm text-muted-foreground">
              Content Management
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href || 
                (item.href !== '/admin/dashboard' && router.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {session?.user?.name?.[0] || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {session?.user?.name || 'Admin'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}