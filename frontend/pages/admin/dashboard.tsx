import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  FolderOpen, 
  Mail, 
  MessageSquare, 
  Plus,
  Users,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Building2,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  pendingQuotes: number;
  contactMessages: number;
  completedProjects: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    featuredProjects: 0,
    pendingQuotes: 0,
    contactMessages: 0,
    completedProjects: 0,
    unreadMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { getAuthHeader } = await import('../../hooks/use-auth')
        
        // Fetch project stats
        const projectsResponse = await fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          }
        })
        
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json()
          const projects = projectsData.projects || []
          
          // Fetch message stats
          const messagesResponse = await fetch('/api/admin/messages', {
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeader()
            }
          })
          
          if (messagesResponse.ok) {
            const messagesData = await messagesResponse.json()
            
            // Use the stats from the API response which are calculated on the server
            const serverStats = messagesData.stats || {}
            
            setStats({
              totalProjects: projects.length,
              featuredProjects: projects.filter((p: any) => p.featured).length,
              completedProjects: projects.filter((p: any) => p.status === 'Completed').length,
              pendingQuotes: serverStats.quotes || 0,
              contactMessages: serverStats.contacts || 0,
              unreadMessages: serverStats.unread || 0,
            })
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Enhanced Professional Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary to-slate-800 rounded-2xl shadow-2xl border-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-36 -translate-x-36"></div>
          
          <div className="relative z-10 p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
              {/* Main Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                    <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-3xl opacity-50 blur-xl"></div>
                </div>
                
                <div className="text-white space-y-3">
                  <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                      Welcome Back
                    </h1>
                    <div className="flex items-center space-x-3">
                      <div className="text-xl sm:text-2xl font-semibold text-secondary">SYMTECO</div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                      <div className="text-base sm:text-lg text-white/80">Admin Portal</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg sm:text-xl text-white/90 font-medium">
                      Professional Construction Management Hub
                    </p>
                    <p className="text-white/70 text-sm sm:text-base max-w-2xl">
                      Manage your project portfolio, handle client communications, and drive business growth through our comprehensive management platform.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Status Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl w-full sm:min-w-[280px] lg:w-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <p className="text-sm font-medium text-white/80">System Status</p>
                      <p className="text-lg sm:text-xl font-bold">All Systems Operational</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-white">{stats.totalProjects}</div>
                      <div className="text-xs text-white/70">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-secondary">{stats.unreadMessages}</div>
                      <div className="text-xs text-white/70">New Messages</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                    <p className="text-sm text-white/80">Live & Monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold flex items-center text-blue-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-blue-900 mb-1">
                    {loading ? <div className="w-16 h-8 bg-blue-200 rounded animate-pulse"></div> : stats.totalProjects}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">Published projects</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-500 font-semibold">
                    {loading ? '--' : stats.completedProjects} Completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-orange-50 to-orange-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold flex items-center text-orange-700">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-6 w-6 text-white" />
                </div>
                Featured Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-orange-900 mb-1">
                    {loading ? <div className="w-16 h-8 bg-orange-200 rounded animate-pulse"></div> : stats.featuredProjects}
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Highlighted projects</p>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-xs text-orange-500 font-semibold">Showcase</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold flex items-center text-green-700">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                Quote Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-green-900 mb-1">
                    {loading ? <div className="w-16 h-8 bg-green-200 rounded animate-pulse"></div> : stats.pendingQuotes}
                  </div>
                  <p className="text-sm text-green-600 font-medium">Awaiting response</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 font-semibold">Urgent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold flex items-center text-purple-700">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                Contact Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-bold text-purple-900 mb-1">
                    {loading ? <div className="w-16 h-8 bg-purple-200 rounded animate-pulse"></div> : stats.contactMessages}
                  </div>
                  <p className="text-sm text-purple-600 font-medium">General inquiries</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-500 font-semibold">
                    {loading ? '--' : stats.unreadMessages} Unread
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            
            <CardHeader className="bg-gradient-to-r from-primary/10 via-white to-secondary/10 border-b border-primary/10 relative z-10">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <FolderOpen className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-20 blur-lg"></div>
                </div>
                <div className="ml-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Project Management</CardTitle>
                  <CardDescription className="text-gray-600 text-base">Manage your construction project portfolio and showcase your work</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="grid gap-4">
                <Link href="/admin/projects/add">
                  <Button className="w-full justify-start bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 text-white py-4 h-auto group">
                    <div className="flex items-center w-full">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-base">Add New Project</div>
                        <div className="text-sm text-white/80">Create and publish a new project</div>
                      </div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/admin/projects">
                  <Button variant="outline" className="w-full justify-start hover:bg-primary hover:text-white transition-all duration-300 py-4 h-auto border-2 border-primary/20 hover:border-primary group">
                    <div className="flex items-center w-full">
                      <div className="w-10 h-10 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mr-4 transition-all group-hover:scale-110">
                        <Eye className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-base">View All Projects</div>
                        <div className="text-sm text-muted-foreground group-hover:text-white/80">Browse and edit existing projects</div>
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-semibold text-primary">Project Portfolio</p>
                    <p className="text-sm text-muted-foreground">Showcase your completed work</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
                    <div className="text-xs text-muted-foreground">Total projects</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            
            <CardHeader className="bg-gradient-to-r from-green-500/10 via-white to-blue-500/10 border-b border-green-500/10 relative z-10">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl opacity-20 blur-lg"></div>
                </div>
                <div className="ml-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Communications Hub</CardTitle>
                  <CardDescription className="text-gray-600 text-base">Handle client inquiries, quote requests, and business communications</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="grid gap-4">
                <Link href="/admin/messages">
                  <Button className="w-full justify-start bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-white py-4 h-auto group">
                    <div className="flex items-center w-full">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-base">View All Messages</div>
                        <div className="text-sm text-white/80">Access all customer communications</div>
                      </div>
                    </div>
                  </Button>
                </Link>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/admin/messages?tab=quotes">
                    <Button variant="outline" className="w-full justify-center hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all duration-300 py-3 border-2 border-orange-200 group">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{stats.pendingQuotes}</div>
                        <div className="text-xs font-medium">Quote Requests</div>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link href="/admin/messages?tab=contacts">
                    <Button variant="outline" className="w-full justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300 py-3 border-2 border-blue-200 group">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{stats.contactMessages}</div>
                        <div className="text-xs font-medium">Contact Messages</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <p className="font-semibold text-green-700">Message Center</p>
                    <p className="text-sm text-green-600">Client communication management</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl font-bold text-green-600">{stats.unreadMessages}</div>
                    <div className="text-xs text-green-600">Unread messages</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Activity */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-primary/5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">System Overview</CardTitle>
                  <CardDescription className="text-gray-600">Latest system status and performance metrics</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Performance Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <Badge className="bg-green-500 text-white">Operational</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-1">100%</div>
                  <div className="text-sm text-green-700 font-medium">System Uptime</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <Badge className="bg-blue-500 text-white">Fast</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-1">&lt;200ms</div>
                  <div className="text-sm text-blue-700 font-medium">Response Time</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <Badge className="bg-purple-500 text-white">Active</Badge>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 mb-1">1</div>
                  <div className="text-sm text-purple-700 font-medium">Admin Sessions</div>
                </div>
              </div>
              
              {/* Recent Activity Timeline */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-200/50">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">Database initialized successfully</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Just now</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Admin portal is ready for project and message management</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-200/50">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                      <Building2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">Projects seeded to database</p>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">Recently</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{stats.totalProjects} professional construction projects loaded</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-200/50">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900">Admin authentication configured</p>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Secure JWT-based authentication system is operational</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

// No server-side props needed with JWT auth