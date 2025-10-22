import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/image-upload';

interface ProjectFormData {
  title: string;
  description: string;
  images: string[]; // Changed from separate image and images fields
  category: string;
  location: string;
  year: string;
  tags: string[];
  status: string;
  featured: boolean;
  client?: string;
  duration?: string;
  value?: string;
  content?: string;
}

const categories = [
  'Substation Installation',
  'Transformer Installation',
  'Transmission Line Work',
  'Distribution Systems',
  'Technical Services',
  'Maintenance Services',
];

const statusOptions = ['Completed', 'Ongoing', 'Planned'];

export default function AddProject() {
  const router = useRouter();
  const { id } = router.query;
  const isEdit = !!id;
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(isEdit);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    images: [],
    category: '',
    location: '',
    year: new Date().getFullYear().toString(),
    tags: [],
    status: 'Completed',
    featured: false,
    client: '',
    duration: '',
    value: '',
    content: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchProject(id as string);
    }
  }, [isEdit, id]);

  const fetchProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setFormData(data.project);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch project',
          variant: 'destructive',
        });
        router.push('/admin/projects');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch project',
        variant: 'destructive',
      });
      router.push('/admin/projects');
    } finally {
      setLoadingProject(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.year) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.images.length === 0) {
      toast({
        title: 'Error',
        description: 'Please upload at least one image',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Format data for API - main image is the first one, rest go in images array
      const dataToSubmit = {
        ...formData,
        image: formData.images[0] || '', // Main image
        images: formData.images, // All images including main
      };

      const response = await fetch(
        isEdit ? `/api/projects/${id}` : '/api/projects',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: `Project ${isEdit ? 'updated' : 'created'} successfully`,
        });
        router.push('/admin/projects');
      } else {
        toast({
          title: 'Error',
          description: data.error || `Failed to ${isEdit ? 'update' : 'create'} project`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEdit ? 'update' : 'create'} project`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  if (loadingProject) {
    return (
      <AdminLayout title={isEdit ? 'Edit Project' : 'Add Project'}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Project' : 'Add Project'}>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Edit Project' : 'Add New Project'}</CardTitle>
            <CardDescription>
              {isEdit ? 'Update project information' : 'Create a new project entry for your portfolio'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Substation Construction Project"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the project..."
                  rows={3}
                  required
                />
              </div>

              {/* Location and Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Abeokuta, Ogun State"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2025"
                    required
                  />
                </div>
              </div>

              {/* Status and Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Featured Project</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <span className="text-sm text-muted-foreground">
                      Show on homepage
                    </span>
                  </div>
                </div>
              </div>

              {/* Images */}
              <ImageUpload
                label="Project Images"
                value={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                maxImages={5}
                required={true}
              />

              {/* Tags */}
              <div className="space-y-2">
                <Label>Project Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Client name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 6 months"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">Project Value</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="e.g., ₦50M"
                  />
                </div>
              </div>

              {/* Detailed Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Detailed Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed project information for full project page..."
                  rows={5}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/projects')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}