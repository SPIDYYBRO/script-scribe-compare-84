
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAnalysisById } from "@/utils/analysisService";

interface AnalysisResultProps {
  analysisId?: string;
}

export default function AnalysisResult({ analysisId }: AnalysisResultProps) {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (analysisId) {
        try {
          const record = await getAnalysisById(analysisId);
          if (record) {
            setAnalysisData({
              ...record.analysis_data,
              comparisonTarget: record.comparison_target,
              date: new Date(record.created_at),
              imageUrl: record.image_url,
              similarityScore: record.similarity_score
            });
          }
        } catch (error) {
          console.error("Error fetching analysis:", error);
        }
      }
      setLoading(false);
    };
    
    fetchAnalysis();
  }, [analysisId]);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scriptGreen"></div>
      </div>
    );
  }

  if (!analysisData) {
    // If no analysis ID was provided, use mock data for display
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h2 className="text-2xl font-bold mb-4">No Analysis Data</h2>
        <p className="text-muted-foreground">
          Please upload a handwriting sample to analyze.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-2">Your Handwriting Sample</h3>
          <div className="bg-muted rounded-md overflow-hidden">
            <img 
              src={analysisData.imageUrl} 
              alt="Your handwriting sample" 
              className="w-full h-auto object-contain max-h-[300px]"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-2">Compared with {analysisData.comparisonTarget}</h3>
          <div className="bg-muted rounded-md h-[300px] flex items-center justify-center p-4">
            {analysisData.comparisonTarget === "Custom Image" ? (
              <p className="text-muted-foreground">Custom comparison image</p>
            ) : (
              <p className={`text-center text-lg font-${analysisData.comparisonTarget.toLowerCase().includes('times') ? 'times' : 
                analysisData.comparisonTarget.toLowerCase().includes('arial') ? 'arial' :
                analysisData.comparisonTarget.toLowerCase().includes('calibri') ? 'calibri' : 'helvetica'}`}>
                The quick brown fox jumps over the lazy dog
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Character Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Overall Similarity Score</span>
                <span className={`text-2xl font-bold ${
                  analysisData.similarityScore >= 80 ? "text-green-500" : 
                  analysisData.similarityScore >= 60 ? "text-yellow-500" : 
                  "text-red-500"
                }`}>
                  {analysisData.similarityScore}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-4 mb-6">
                <div 
                  className={`h-4 rounded-full ${getScoreColor(analysisData.similarityScore)}`} 
                  style={{ width: `${analysisData.similarityScore}%` }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Your handwriting has been analyzed against {analysisData.comparisonTarget}. Here's a breakdown of various attributes:
              </p>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Character Spacing</span>
                    <span className="text-sm font-medium">{analysisData.characterSpacing}%</span>
                  </div>
                  <Progress value={analysisData.characterSpacing} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Line Consistency</span>
                    <span className="text-sm font-medium">{analysisData.lineConsistency}%</span>
                  </div>
                  <Progress value={analysisData.lineConsistency} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Character Formation</span>
                    <span className="text-sm font-medium">{analysisData.characterFormation}%</span>
                  </div>
                  <Progress value={analysisData.characterFormation} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Pressure Consistency</span>
                    <span className="text-sm font-medium">{analysisData.pressure}%</span>
                  </div>
                  <Progress value={analysisData.pressure} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Writing Slant</span>
                    <span className="text-sm font-medium">{analysisData.slant}%</span>
                  </div>
                  <Progress value={analysisData.slant} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your handwriting shows a {analysisData.similarityScore}% similarity to {analysisData.comparisonTarget}. 
                You have excellent pressure consistency ({analysisData.pressure}%), indicating confident writing. 
                {analysisData.characterSpacing > 70 ? ' Your character spacing is good, ' : ' Your character spacing needs improvement, '}
                {analysisData.lineConsistency > 70 ? ' and your line consistency is excellent.' : ' and your line consistency could be improved.'}
              </p>
              
              <p className="text-sm mt-4">
                {analysisData.similarityScore >= 80 ? 
                  `Your handwriting is highly similar to ${analysisData.comparisonTarget}. With continued practice, you can maintain this excellent level of consistency.` :
                  analysisData.similarityScore >= 60 ?
                  `For improved similarity to ${analysisData.comparisonTarget}, focus on maintaining consistent slant angles and practicing character formations highlighted in the details tab.` :
                  `Your handwriting differs significantly from ${analysisData.comparisonTarget}. Regular practice with focus on character formation and spacing would help improve similarity.`
                }
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Character Analysis Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysisData.details.map((detail: any, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-medium">Letter: '{detail.character}'</h4>
                      <span className={`font-bold ${
                        detail.similarityScore >= 80 ? "text-green-500" : 
                        detail.similarityScore >= 60 ? "text-yellow-500" : 
                        "text-red-500"
                      }`}>
                        {detail.similarityScore}%
                      </span>
                    </div>
                    <Progress value={detail.similarityScore} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">{detail.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
