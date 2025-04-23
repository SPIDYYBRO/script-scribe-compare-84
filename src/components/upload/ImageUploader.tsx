
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useFont, FontChoice } from "@/contexts/FontContext";

type ComparisonType = "font" | "image";

export default function ImageUploader() {
  const { toast } = useToast();
  const { font, fontName } = useFont();
  
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [comparisonType, setComparisonType] = useState<ComparisonType>("font");

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      setIsUploading(false);
      toast({
        title: "Image uploaded",
        description: "Your handwriting image has been uploaded successfully.",
      });
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
        variant: "destructive",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleComparisonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setComparisonImage(reader.result as string);
        toast({
          title: "Comparison image uploaded",
          description: "Your comparison image has been uploaded successfully.",
        });
      };

      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your comparison image.",
          variant: "destructive",
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setComparisonImage(null);
  };

  const startAnalysis = () => {
    // In a real app, this would send the images for processing
    toast({
      title: "Analysis started",
      description: "Your handwriting is being analyzed. This might take a moment.",
    });
    
    // Mock analysis delay
    setTimeout(() => {
      toast({
        title: "Analysis complete",
        description: "Your handwriting analysis is ready.",
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Handwriting Sample</h3>
              <p className="text-sm text-muted-foreground">Upload a clear image of your handwriting</p>
            </div>

            {!uploadedImage ? (
              <div
                className={`upload-zone ${dragActive ? 'border-scriptGreen ring-1 ring-scriptGreen' : ''}`}
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
                <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                  <Upload className="h-10 w-10 text-scriptGreen mb-2" />
                  <p className="text-sm font-medium mb-1">
                    {isUploading ? "Uploading..." : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max. 5MB)</p>
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
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded handwriting sample"
                  className="w-full h-auto rounded-md object-cover max-h-[300px]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80"
                  onClick={resetUpload}
                >
                  Replace
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Comparison</h3>
              <p className="text-sm text-muted-foreground">Select what to compare with</p>
            </div>

            <div className="mb-4">
              <Select 
                value={comparisonType} 
                onValueChange={(value) => setComparisonType(value as ComparisonType)}
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
              <div className={`handwriting-sample font-${font} flex items-center justify-center`}>
                <p className="text-center text-lg">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ) : (
              <>
                {!comparisonImage ? (
                  <div className="upload-zone">
                    <label htmlFor="comparison-upload" className="flex flex-col items-center cursor-pointer">
                      <Image className="h-10 w-10 text-scriptGreen mb-2" />
                      <p className="text-sm font-medium mb-1">
                        Upload comparison image
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max. 5MB)</p>
                      <input
                        id="comparison-upload"
                        name="comparison-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleComparisonFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={comparisonImage}
                      alt="Comparison image"
                      className="w-full h-auto rounded-md object-cover max-h-[300px]"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-background/80"
                      onClick={() => setComparisonImage(null)}
                    >
                      Replace
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          className="bg-scriptGreen hover:bg-scriptGreen/90 px-8"
          disabled={!uploadedImage || (comparisonType === "image" && !comparisonImage)}
          onClick={startAnalysis}
        >
          Analyze Handwriting
        </Button>
      </div>
    </div>
  );
}
