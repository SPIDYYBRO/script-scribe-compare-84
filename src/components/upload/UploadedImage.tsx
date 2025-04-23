
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface UploadedImageProps {
  imageUrl: string;
  onReset: () => void;
  className?: string;
}

export default function UploadedImage({ imageUrl, onReset, className = "h-64" }: UploadedImageProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={imageUrl}
        alt="Uploaded image"
        className="w-full h-full rounded-md object-contain bg-muted/50"
      />
      <Button
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 bg-background/80 p-1.5 h-auto"
        onClick={onReset}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
