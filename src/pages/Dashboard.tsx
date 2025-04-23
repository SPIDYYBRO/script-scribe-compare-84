
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import ImageUploader from "@/components/upload/ImageUploader";
import AnalysisResult from "@/components/analysis/AnalysisResult";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useSearchParams } from "react-router-dom";
import { getAnalysisHistory } from "@/utils/storageService";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'results' ? "results" : "upload");
  const [latestAnalysisId, setLatestAnalysisId] = useState<string | undefined>(undefined);
  
  // Get the latest analysis on load
  useEffect(() => {
    const history = getAnalysisHistory();
    if (history.length > 0) {
      setLatestAnalysisId(history[0].id);
    }
  }, []);
  
  // If user is not logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Handwriting Analysis</h1>
        
        <Tabs 
          defaultValue="upload" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <ImageUploader />
            
            {latestAnalysisId && (
              <div className="mt-8 flex justify-center">
                <button 
                  className="text-scriptGreen underline text-sm"
                  onClick={() => setActiveTab("results")}
                >
                  View latest results
                </button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results">
            <AnalysisResult analysisId={latestAnalysisId} />
            
            <div className="mt-8 flex justify-center">
              <button 
                className="text-scriptGreen underline text-sm"
                onClick={() => setActiveTab("upload")}
              >
                Upload a new sample
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
