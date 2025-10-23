import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../hooks/use-auth';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { login, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel!",
          variant: "default",
        });
        router.push('/admin/dashboard');
      } else {
        setLoginError(result.error || 'Invalid email or password');
        toast({
          title: "Login Failed",
          description: result.error || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/95 border-0 shadow-2xl relative z-10">
        <CardHeader className="space-y-6 text-center pb-8">
          {/* Enhanced Logo Section */}
          <div className="mx-auto mb-2 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <div className="text-3xl">🏗️</div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-xl"></div>
          </div>
          
          {/* Brand Identity */}
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-primary">SYMTECO</div>
            <div className="text-sm font-medium text-muted-foreground tracking-wider">NIGERIAN LIMITED</div>
          </div>
          
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
          
          <CardTitle className="text-2xl font-bold text-foreground">Admin Portal</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Professional Construction Management System<br/>
            <span className="text-sm">Enter your credentials to access the admin panel</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {loginError && (
              <Alert variant="destructive" className="border-l-4 border-l-destructive bg-destructive/10 backdrop-blur-sm">
                <AlertDescription className="font-medium">{loginError}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@symteconigerialimited.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-2 border-muted hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-2 border-muted hover:border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Access Admin Panel</span>
                </div>
              )}
            </Button>
          </form>
          
          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/50 backdrop-blur-sm rounded-xl border border-muted">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Security Notice</p>
                <p>This is a secure admin portal for authorized personnel only. All access attempts are logged and monitored.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// No server-side props needed with JWT auth