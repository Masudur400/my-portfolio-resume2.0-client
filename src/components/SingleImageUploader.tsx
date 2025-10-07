'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface SingleImageUploaderProps {
  onChange: (file: File | null) => void;
}

export default function SingleImageUploader({ onChange }: SingleImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxSizeMB = 5;

  const handleFile = async (file: File) => {
    setError(null);

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    try {
      // Compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      const previewUrl = URL.createObjectURL(compressedFile);
      setPreview(previewUrl);
      onChange(compressedFile);
    } catch (err) {
      console.error('Image compression failed', err);
      setError('Failed to compress image');
      onChange(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${
          isDragging ? 'bg-accent/50' : 'bg-gray-800/50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative w-full h-52">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 rounded-full p-1"
            >
              <XIcon className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center h-52 cursor-pointer"
          >
            <div className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border">
              <ImageUpIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">
              Drop your image here or click to browse
            </p>
            <p className="text-muted-foreground text-xs">
              Max size: {maxSizeMB}MB
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        )}
      </div>

      {error && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}