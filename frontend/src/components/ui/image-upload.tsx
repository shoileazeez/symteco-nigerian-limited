import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ImageUploadProps {
  label?: string;
  value: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  required?: boolean;
}

export default function ImageUpload({ 
  label = "Images", 
  value = [], 
  onChange, 
  maxImages = 5,
  required = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newImages = [...value, data.imageUrl];
        onChange(newImages);
        toast({
          title: 'Success',
          description: 'Image uploaded successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to upload image',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxImages) {
      toast({
        title: 'Too many images',
        description: `Maximum ${maxImages} images allowed`,
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file',
            description: `${file.name} is not an image file`,
            variant: 'destructive',
          });
          continue;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} is larger than 5MB`,
            variant: 'destructive',
          });
          continue;
        }

        await uploadImage(file);
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (imageUrl: string) => {
    const newImages = value.filter(img => img !== imageUrl);
    onChange(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <Label>{label} {required && '*'}</Label>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <div className="space-y-2">
          <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            <p>Drag and drop images here, or</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || value.length >= maxImages}
              className="mt-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF up to 5MB each. Max {maxImages} images.
          </p>
        </div>
      </div>

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-muted">
                <Image
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(imageUrl)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {index === 0 && (
                <Badge className="absolute -top-2 -left-2 bg-primary text-primary-foreground">
                  Main
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image URLs Display (for debugging/manual entry) */}
      {value.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Uploaded Image URLs:</Label>
          <div className="space-y-1">
            {value.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono">
                  {index === 0 ? 'Main: ' : `${index + 1}: `}
                  {url.substring(0, 50)}...
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeImage(url)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="text-xs text-muted-foreground">
        {value.length} of {maxImages} images uploaded
      </div>
    </div>
  );
}