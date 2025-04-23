
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import AnalysisResultContent from "@/components/analysis/AnalysisResult";
import { getAnalysisById } from "@/utils/analysisService";
import { useToast } from "@/components/ui/use-toast";

export default function AnalysisResult() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analysisExists, setAnalysisExists] = useState(false);
  
  useEffect(() => {
    const checkAnalysis = async () => {
      if (!id) {
        toast({
          title: "Analysis not found",
          description: "The requested analysis could not be found.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      try {
        const analysisRecord = await getAnalysisById(id);
        if (!analysisRecord) {
          toast({
            title: "Analysis not found",
            description: "The requested analysis could not be found or has expired.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        // Analysis exists
        setAnalysisExists(true);
      } catch (error) {
        console.error("Error checking analysis:", error);
        toast({
          title: "Error loading analysis",
          description: "There was a problem loading the analysis.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAnalysis();
  }, [id, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scriptGreen"></div>
          </div>
        ) : !analysisExists ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Analysis Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The requested analysis could not be found or has expired.
            </p>
            <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90">
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Analysis Results</h1>
              <Button asChild variant="outline">
                <Link to="/dashboard">New Analysis</Link>
              </Button>
            </div>
            
            <AnalysisResultContent analysisId={id} />
          </div>
        )}
      </main>
    </div>
  );
}
