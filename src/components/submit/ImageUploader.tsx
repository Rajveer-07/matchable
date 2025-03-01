
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

const ImageUploader = ({ 
  previewUrl, 
  setPreviewUrl, 
  isUploading, 
  setIsUploading 
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setPreviewUrl(reader.result as string);
        setIsUploading(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label>Profile Image</Label>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      
      {!previewUrl ? (
        <div 
          onClick={triggerFileInput}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors duration-300"
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="h-10 w-10 animate-spin mb-2" />
              <p>Uploading image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Upload className="h-10 w-10 mb-2" />
              <p>Click to upload an image</p>
              <p className="text-xs mt-2">JPEG, PNG (max 5MB)</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;