
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAnalysisById, type AnalysisRecord } from "@/utils/analysisService";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lightbulb } from "lucide-react";

interface AnalysisResultProps {
  analysisId?: string;
}

interface EnhancedAnalysisData {
  comparisonTarget: string;
  date: Date;
  imageUrl: string;
  similarityScore: number;
  characterSpacing: number;
  lineConsistency: number;
  characterFormation: number;
  pressure: number;
  slant: number;
  details: Array<{
    character: string;
    similarityScore: number;
    notes: string;
  }>;
}

export default function AnalysisResult({ analysisId }: AnalysisResultProps) {
  const [analysisData, setAnalysisData] = useState<EnhancedAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (analysisId) {
        try {
          const record = await getAnalysisById(analysisId);
          if (record) {
            // Type assertion to ensure TypeScript knows this is an AnalysisRecord
            const typedRecord = record as AnalysisRecord;
            
            setAnalysisData({
              ...typedRecord.analysis_data,
              comparisonTarget: typedRecord.comparison_target,
              date: new Date(typedRecord.created_at),
              imageUrl: typedRecord.image_url,
              similarityScore: typedRecord.similarity_score
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

  const getImprovementTips = (category: string, score: number) => {
    const tips = {
      characterSpacing: {
        low: "Practice maintaining consistent spacing between letters. Use lined paper with grid markings to guide your spacing.",
        medium: "Your character spacing is improving! Continue practicing with consistent letter widths and pay attention to kerning pairs.",
        high: "Excellent spacing! To perfect it further, focus on problematic letter combinations like 'rn' vs 'm'."
      },
      lineConsistency: {
        low: "Use lined paper and practice writing in a straight line. Try to keep your text from slanting upward or downward.",
        medium: "Your line consistency is getting better. Try placing a ruler or straight edge below each line as you write to maintain straightness.",
        high: "Great line consistency! For perfection, practice writing on unlined paper while maintaining the same baseline."
      },
      characterFormation: {
        low: "Practice drawing each letter slowly and deliberately. Study exemplars of each letter and try to match their form.",
        medium: "Your letter formations are developing well. Focus on consistency in loops, ascenders, and descenders.",
        high: "Excellent character formation! To perfect it, focus on the subtle details like serifs and letter terminations."
      },
      pressure: {
        low: "Try to maintain even pressure throughout your writing. Practice with different pen types to find what works best for your style.",
        medium: "Your pressure consistency is improving. Practice transitioning between thin and thick strokes if using a pressure-sensitive pen.",
        high: "Great pressure control! To perfect it, practice calligraphic techniques that require varied pressure."
      },
      slant: {
        low: "Choose a slant angle (forward, vertical, or backward) and practice maintaining it consistently across all letters.",
        medium: "Your slant consistency is improving. Draw slant lines on your practice paper as guides.",
        high: "Excellent slant consistency! Try varying your slant intentionally to develop different writing styles."
      }
    };
    
    const level = score < 60 ? "low" : score < 80 ? "medium" : "high";
    return tips[category][level];
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Character Details</TabsTrigger>
          <TabsTrigger value="improvement">Improvement Tips</TabsTrigger>
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

              <Alert className="mt-6 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-sm text-blue-700">
                  <strong>Expert Analysis:</strong> Your writing shows {
                    analysisData.pressure > analysisData.characterFormation ? "strength in pressure control but could benefit from more focus on letter formation" :
                    "good attention to letter shapes but could benefit from more consistent pressure"
                  }. The {
                    analysisData.slant < 65 ? "inconsistent slant" : "consistent slant"
                  } in your writing {
                    analysisData.slant < 65 ? "suggests you may change writing positions frequently" : "indicates a stable writing position"
                  }.
                </AlertDescription>
              </Alert>
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
                    
                    {detail.similarityScore < 70 && (
                      <div className="mt-3 flex items-start gap-2 text-sm">
                        <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {detail.similarityScore < 50 
                            ? `Try practicing letter '${detail.character}' using tracing exercises.` 
                            : `Focus on the ${detail.character === 'i' || detail.character === 'j' ? 'dot placement and height' : 'curves and angles'} of this letter.`}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvement">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Improvement Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Based on your analysis, we've created a personalized plan to help improve your handwriting. 
                Focus on these areas for the most significant improvement:
              </p>

              <div className="space-y-8">
                {/* Priority Areas - Find the lowest two scores */}
                {(() => {
                  const categories = [
                    { name: "Character Spacing", key: "characterSpacing", score: analysisData.characterSpacing },
                    { name: "Line Consistency", key: "lineConsistency", score: analysisData.lineConsistency },
                    { name: "Character Formation", key: "characterFormation", score: analysisData.characterFormation },
                    { name: "Pressure Consistency", key: "pressure", score: analysisData.pressure },
                    { name: "Writing Slant", key: "slant", score: analysisData.slant }
                  ].sort((a, b) => a.score - b.score);
                  
                  const priorityAreas = categories.slice(0, 2);
                  
                  return (
                    <div>
                      <h3 className="text-md font-semibold mb-3">Priority Focus Areas</h3>
                      {priorityAreas.map((area, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">{area.name}</h4>
                            <span className={`text-sm px-2 py-0.5 rounded-full ${
                              area.score < 50 ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {area.score < 50 ? "Needs Attention" : "Improving"}
                            </span>
                          </div>
                          <Progress value={area.score} className="h-2 mb-2" />
                          <Alert className="bg-blue-50 border-blue-100">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            <AlertDescription className="text-sm">
                              <strong>Tip:</strong> {getImprovementTips(area.key, area.score)}
                            </AlertDescription>
                          </Alert>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Daily Practice Routine */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Daily Practice Routine</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Warm up with basic strokes (5 minutes): Practice straight lines, curves, and loops.</li>
                    <li>Letter formation (10 minutes): Focus on the letters identified as needing improvement in the details tab.</li>
                    <li>Word practice (5 minutes): Write common words that include your challenging letters.</li>
                    <li>Sentence practice (5 minutes): Write a sentence containing all letters of the alphabet.</li>
                  </ol>
                </div>

                {/* Additional Resources */}
                <div>
                  <h3 className="text-md font-semibold mb-3">Recommended Resources</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Use lined paper with guidelines for consistent letter height and spacing</li>
                    <li>Try different pen types to find what works best for your writing style</li>
                    <li>Consider using a light box or tracing paper for initial practice</li>
                    <li>Record your progress by saving dated samples of your handwriting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
