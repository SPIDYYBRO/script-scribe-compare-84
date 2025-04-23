import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFont } from "@/contexts/FontContext";
import { analyzeHandwriting } from "@/utils/handwritingAnalysis";
import { uploadImage } from "@/utils/supabaseStorage";
import { saveAnalysisResult } from "@/utils/analysisService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ComparisonType = "font" | "image";

export default function ImageUploader() {
  const { toast } = useToast();
  const { font, fontName } = useFont();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [comparisonType, setComparisonType] = useState<ComparisonType>("font");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonFileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setUploadedImage(imageUrl);
      toast({
        title: "Image uploaded",
        description: "Your handwriting image has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleComparisonFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }

      try {
        const imageUrl = await uploadImage(file);
        setComparisonImage(imageUrl);
        toast({
          title: "Comparison image uploaded",
          description: "Your comparison image has been uploaded successfully.",
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your comparison image.",
          variant: "destructive",
        });
      }
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setComparisonImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (comparisonFileInputRef.current) comparisonFileInputRef.current.value = '';
  };

  const startAnalysis = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to analyze handwriting.",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedImage) {
      toast({
        title: "No handwriting sample",
        description: "Please upload a handwriting sample to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    if (comparisonType === "image" && !comparisonImage) {
      toast({
        title: "No comparison image",
        description: "Please upload an image to compare against.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    toast({
      title: "Analysis started",
      description: "Your handwriting is being analyzed. This might take a moment.",
    });
    
    try {
      const analysisResult = analyzeHandwriting(
        uploadedImage,
        comparisonType,
        comparisonType === "image" ? comparisonImage || undefined : undefined,
        comparisonType === "font" ? font : undefined
      );

      const record = await saveAnalysisResult(
        uploadedImage,
        comparisonType,
        comparisonType === "font" ? fontName : "Custom Image",
        analysisResult.similarityScore,
        analysisResult
      );
      
      toast({
        title: "Analysis complete",
        description: "Your handwriting analysis is ready to view.",
      });
      
      navigate(`/analysis/${record.id}`);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your handwriting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                  <p className="text-sm font-medium mb-1">
                    {isUploading ? "Uploading..." : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG or JPEG</p>
                  <input
                    id="file-upload"
                    name="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleChange}
                    disabled={isUploading}
                  />
                </label>
              </div>
            ) : (
              <div className="relative h-64">
                <img
                  src={uploadedImage}
                  alt="Uploaded handwriting sample"
                  className="w-full h-full rounded-md object-contain bg-muted/50"
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
                onValueChange={(value) => {
                  setComparisonType(value as ComparisonType);
                  setComparisonImage(null);
                }}
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
                {!comparisonImage ? (
                  <div className="upload-zone h-[220px]">
                    <label htmlFor="comparison-upload" className="flex flex-col items-center justify-center h-full cursor-pointer">
                      <Image className="h-10 w-10 text-scriptGreen mb-2" />
                      <p className="text-sm font-medium mb-1">
                        Upload comparison image
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG or JPEG</p>
                      <input
                        id="comparison-upload"
                        name="comparison-upload"
                        ref={comparisonFileInputRef}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleComparisonFileChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative h-[220px]">
                    <img
                      src={comparisonImage}
                      alt="Comparison image"
                      className="w-full h-full rounded-md object-contain bg-muted/50"
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
          disabled={!uploadedImage || (comparisonType === "image" && !comparisonImage) || isAnalyzing}
          onClick={startAnalysis}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Handwriting"}
        </Button>
      </div>
    </div>
  );
}
