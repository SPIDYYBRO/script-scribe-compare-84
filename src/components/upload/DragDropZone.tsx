
import { useState } from "react";
import { Upload } from "lucide-react";

interface DragDropZoneProps {
  onFileDrop: (file: File) => void;
  isUploading: boolean;
}

export default function DragDropZone({ onFileDrop, isUploading }: DragDropZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must not exceed 5MB');
        return;
      }
      onFileDrop(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must not exceed 5MB');
        return;
      }
      onFileDrop(file);
    }
  };

  return (
    <div
      className={`upload-zone h-64 ${dragActive ? 'border-scriptGreen ring-1 ring-scriptGreen' : ''}`}
      onDragOver={(e) => { 
        e.preventDefault(); 
        setDragActive(true); 
      }}
      onDragEnter={(e) => { 
        e.preventDefault(); 
        setDragActive(true); 
      }}
      onDragLeave={(e) => { 
        e.preventDefault(); 
        setDragActive(false); 
      }}
      onDrop={handleDrop}
    >
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-full cursor-pointer">
        <Upload className="h-10 w-10 text-scriptGreen mb-2" />
        <p className="text-sm font-medium mb-1">Drag & drop or click to upload</p>
        <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max 5MB)</p>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
