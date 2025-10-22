import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { authOptions } from '@/lib/auth'
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
  Reply
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    pendingQuotes: 0,
    contactMessages: 0,
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and communications</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Published projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.featuredProjects}</div>
              <p className="text-xs text-muted-foreground">Highlighted on homepage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quote Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactMessages}</div>
              <p className="text-xs text-muted-foreground">General inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Manage your project portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/projects/add">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Project
                </Button>
              </Link>
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Projects
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Handle quotes and contact messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/messages">
                <Button className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All Messages
                </Button>
              </Link>
              <Link href="/admin/messages?tab=quotes">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Quote Requests
                </Button>
              </Link>
              <Link href="/admin/messages?tab=contacts">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Messages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">System initialized</p>
                    <p className="text-sm text-muted-foreground">Admin dashboard is ready for use</p>
                  </div>
                </div>
                <Badge variant="secondary">Just now</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}