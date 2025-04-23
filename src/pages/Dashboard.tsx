
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import ImageUploader from "@/components/upload/ImageUploader";
import AnalysisResult from "@/components/analysis/AnalysisResult";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  
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
            
            <div className="mt-8 flex justify-center">
              <button 
                className="text-scriptGreen underline text-sm"
                onClick={() => setActiveTab("results")}
              >
                View sample results
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <AnalysisResult />
            
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
