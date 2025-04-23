
import { Image } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFont } from "@/contexts/FontContext";
import { Progress } from "@/components/ui/progress";
import UploadedImage from "./UploadedImage";

interface ComparisonSectionProps {
  comparisonType: "font" | "image";
  comparisonImage: string | null;
  isUploading: boolean;
  uploadProgress: number;
  onTypeChange: (value: "font" | "image") => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function ComparisonSection({
  comparisonType,
  comparisonImage,
  isUploading,
  uploadProgress,
  onTypeChange,
  onFileChange,
  onReset
}: ComparisonSectionProps) {
  const { font, fontName } = useFont();

  return (
    <div>
      <div className="mb-4">
        <Select 
          value={comparisonType} 
          onValueChange={(value: "font" | "image") => onTypeChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select comparison type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="font">Standard Font ({fontName})</SelectItem>
            <SelectItem value="image">Another Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {comparisonType === "font" ? (
        <div className={`handwriting-sample font-${font} flex items-center justify-center h-[220px] text-center`}>
          <p className="text-lg px-4">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      ) : (
        <>
          {isUploading ? (
            <div className="h-[220px] flex flex-col items-center justify-center">
              <p className="text-sm mb-2">Uploading... {Math.round(uploadProgress)}%</p>
              <Progress value={uploadProgress} className="w-full max-w-xs" />
            </div>
          ) : !comparisonImage ? (
            <div className="upload-zone h-[220px]">
              <label htmlFor="comparison-upload" className="flex flex-col items-center justify-center h-full cursor-pointer">
                <Image className="h-10 w-10 text-scriptGreen mb-2" />
                <p className="text-sm font-medium mb-1">Upload comparison image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max 5MB recommended)</p>
                <input
                  id="comparison-upload"
                  name="comparison-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onFileChange}
                />
              </label>
            </div>
          ) : (
            <UploadedImage
              imageUrl={comparisonImage}
              onReset={onReset}
              className="h-[220px]"
            />
          )}
        </>
      )}
    </div>
  );
}
