import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useFont } from "@/contexts/FontContext";
import { analyzeHandwriting } from "@/utils/handwritingAnalysis";
import { uploadImage } from "@/utils/supabaseStorage";
import { saveAnalysisResult } from "@/utils/analysisService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import DragDropZone from "./DragDropZone";
import UploadedImage from "./UploadedImage";
import ComparisonSection from "./ComparisonSection";

type ComparisonType = "font" | "image";

export default function ImageUploader() {
  const { toast } = useToast();
  const { font, fontName } = useFont();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [comparisonType, setComparisonType] = useState<ComparisonType>("font");

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
    setUploadProgress(0);
    
    try {
      const imageUrl = await uploadImage(file, (progress) => {
        setUploadProgress(progress);
      });
      
      setUploadedImage(imageUrl);
      toast({
        title: "Image uploaded",
        description: "Your handwriting image has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again with a smaller image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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

      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        const imageUrl = await uploadImage(file, (progress) => {
          setUploadProgress(progress);
        });
        
        setComparisonImage(imageUrl);
        toast({
          title: "Comparison image uploaded",
          description: "Your comparison image has been uploaded successfully.",
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your comparison image. Please try again with a smaller image.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
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
        uploadedImage!,
        comparisonType,
        comparisonType === "image" ? comparisonImage || undefined : undefined,
        comparisonType === "font" ? font : undefined
      );

      const record = await saveAnalysisResult(
        uploadedImage!,
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
              <>
                {isUploading ? (
                  <div className="h-64 flex flex-col items-center justify-center">
                    <p className="text-sm mb-2">Uploading... {Math.round(uploadProgress)}%</p>
                    <Progress value={uploadProgress} className="w-full max-w-xs" />
                  </div>
                ) : (
                  <DragDropZone
                    onFileDrop={handleFileUpload}
                    isUploading={isUploading}
                  />
                )}
              </>
            ) : (
              <UploadedImage
                imageUrl={uploadedImage}
                onReset={() => setUploadedImage(null)}
              />
            )}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Comparison</h3>
              <p className="text-sm text-muted-foreground">Select what to compare with</p>
            </div>

            <ComparisonSection
              comparisonType={comparisonType}
              comparisonImage={comparisonImage}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              onTypeChange={(value) => {
                setComparisonType(value as ComparisonType);
                setComparisonImage(null);
              }}
              onFileChange={handleComparisonFileChange}
              onReset={() => setComparisonImage(null)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          className="bg-scriptGreen hover:bg-scriptGreen/90 px-8"
          disabled={!uploadedImage || (comparisonType === "image" && !comparisonImage) || isAnalyzing || isUploading}
          onClick={startAnalysis}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Handwriting"}
        </Button>
      </div>
    </div>
  );
}
