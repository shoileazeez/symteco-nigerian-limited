import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAuthHeader } from '../../../hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Eye, FolderOpen, Star, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [viewDialog, setViewDialog] = useState<Project | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch projects',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.filter(p => p.id !== id));
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to delete project',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialog(null);
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const project = projects.find(p => p.id === id);
      if (!project) return;

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({
          ...project,
          featured: !featured,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.map(p => 
          p.id === id ? { ...p, featured: !featured } : p
        ));
        toast({
          title: 'Success',
          description: `Project ${!featured ? 'featured' : 'unfeatured'} successfully`,
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to update project',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Projects">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Projects">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Project Portfolio</h2>
            <p className="text-gray-600 mt-1">
              Create, edit, and manage your construction projects
            </p>
          </div>
          <Link href="/admin/projects/add">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-blue-700">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <FolderOpen className="h-5 w-5 text-white" />
                </div>
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{projects.length}</div>
              <div className="text-sm text-blue-600 mt-1">Active portfolio</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-primary/10 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-primary">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                Featured Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{projects.filter(p => p.featured).length}</div>
              <div className="text-sm text-primary/70 mt-1">Highlighted showcase</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-green-700">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                Completed Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{projects.filter(p => p.status === 'Completed').length}</div>
              <div className="text-sm text-green-600 mt-1">Successfully delivered</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-xl border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Project Portfolio</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Manage and organize your construction projects
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {projects.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  Get started by adding your first construction project
                </p>
                <Link href="/admin/projects/add">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gray-100">
                      <TableHead className="font-semibold text-gray-700">Project Title</TableHead>
                      <TableHead className="font-semibold text-gray-700">Category</TableHead>
                      <TableHead className="font-semibold text-gray-700">Location</TableHead>
                      <TableHead className="font-semibold text-gray-700">Year</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Featured</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow 
                        key={project.id}
                        className={`hover:bg-gray-50 transition-colors ${project.featured ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {project.title}
                            {project.featured && <Star className="ml-2 w-4 h-4 text-primary fill-primary" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            {project.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{project.location}</TableCell>
                        <TableCell className="text-gray-600">{project.year}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={project.status === 'Completed' ? 'default' : 'secondary'}
                            className={project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-700'}
                          >
                            {project.status === 'Completed' ? '✅ Completed' : project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(project.id, project.featured)}
                            className={project.featured 
                              ? 'bg-primary text-white hover:bg-primary/90 border-primary' 
                              : 'hover:bg-primary hover:text-white hover:border-primary transition-all duration-300'
                            }
                          >
                            {project.featured ? (
                              <>
                                <Star className="h-4 w-4 mr-1 fill-current" />
                                Featured
                              </>
                            ) : (
                              <>
                                <Star className="h-4 w-4 mr-1" />
                                Feature
                              </>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Dialog open={viewDialog?.id === project.id} onOpenChange={(open) => !open && setViewDialog(null)}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setViewDialog(project)}
                                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-300"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-bold flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                                      <Eye className="h-5 w-5 text-white" />
                                    </div>
                                    Project Details
                                  </DialogTitle>
                                  <DialogDescription className="text-base text-gray-600">
                                    Complete information about this project
                                  </DialogDescription>
                                </DialogHeader>
                                {viewDialog && (
                                  <div className="space-y-6 mt-4">
                                    {/* Project Header */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                      <h3 className="text-xl font-bold text-gray-900 mb-2">{viewDialog.title}</h3>
                                      <div className="flex flex-wrap gap-3">
                                        <Badge variant="outline" className="bg-white border-blue-300 text-blue-700">
                                          📍 {viewDialog.location}
                                        </Badge>
                                        <Badge variant="outline" className="bg-white border-green-300 text-green-700">
                                          🏗️ {viewDialog.category}
                                        </Badge>
                                        <Badge variant="outline" className="bg-white border-purple-300 text-purple-700">
                                          📅 {viewDialog.year}
                                        </Badge>
                                        {viewDialog.featured && (
                                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                            ⭐ Featured
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    {/* Project Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            📊
                                          </div>
                                          Status
                                        </h4>
                                        <Badge 
                                          variant={viewDialog.status === 'completed' ? 'default' : 'secondary'}
                                          className={viewDialog.status === 'completed' ? 'bg-green-500' : ''}
                                        >
                                          {viewDialog.status === 'completed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                          {viewDialog.status.charAt(0).toUpperCase() + viewDialog.status.slice(1)}
                                        </Badge>
                                      </div>

                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                            📅
                                          </div>
                                          Created
                                        </h4>
                                        <p className="text-gray-600">
                                          {new Date(viewDialog.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                          })}
                                        </p>
                                      </div>

                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                                            🆔
                                          </div>
                                          Project ID
                                        </h4>
                                        <p className="text-xs font-mono bg-white px-2 py-1 rounded border">
                                          {viewDialog.id}
                                        </p>
                                      </div>

                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                                            ⭐
                                          </div>
                                          Visibility
                                        </h4>
                                        <p className="text-gray-600">
                                          {viewDialog.featured ? '🌟 Featured Project' : '📄 Regular Project'}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-3 pt-4 border-t">
                                      <Link href={`/admin/projects/edit/${viewDialog.id}`}>
                                        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg transition-all duration-300">
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit Project
                                        </Button>
                                      </Link>
                                      <Button 
                                        variant="outline" 
                                        onClick={() => setViewDialog(null)}
                                        className="border-gray-300 hover:bg-gray-50"
                                      >
                                        Close
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Link href={`/admin/projects/edit/${project.id}`}>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-all duration-300"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-lg">
                                <AlertDialogHeader>
                                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-full">
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                  </div>
                                  <AlertDialogTitle className="text-center text-xl font-bold text-gray-900">
                                    Delete Project
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-center text-base text-gray-600">
                                    Are you sure you want to delete <span className="font-semibold text-gray-900">"{project.title}"</span>?
                                    <br />
                                    <span className="text-red-600 font-medium">This action cannot be undone.</span>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex gap-3 mt-6">
                                  <AlertDialogCancel className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-300">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => {
                                      handleDelete(project.id);
                                      setDeleteDialog(null);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Project
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

// No server-side props needed with JWT auth