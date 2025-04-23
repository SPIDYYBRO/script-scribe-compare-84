
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFont } from "@/contexts/FontContext";

// Mock analysis result data
const mockAnalysisData = {
  similarity: 68,
  characterSpacing: 82,
  lineConsistency: 75,
  characterFormation: 65,
  pressure: 90,
  slant: 73,
  details: [
    {
      character: "a",
      similarityScore: 72,
      notes: "Your 'a' has more rounded loops than the comparison."
    },
    {
      character: "e",
      similarityScore: 85,
      notes: "Your 'e' is very similar to the comparison."
    },
    {
      character: "t",
      similarityScore: 60,
      notes: "Your 't' crossbar is positioned higher than the standard."
    },
    {
      character: "r",
      similarityScore: 55,
      notes: "Your 'r' has a distinct style that differs from the standard."
    },
    {
      character: "s",
      similarityScore: 78,
      notes: "Your 's' has good consistency with the comparison."
    }
  ]
};

interface AnalysisResultProps {
  // In a real app, this would receive actual analysis data
  analysisId?: string;
}

export default function AnalysisResult({ analysisId }: AnalysisResultProps) {
  const { fontName } = useFont();
  
  // Normally would fetch data based on analysisId
  const analysisData = mockAnalysisData;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
      
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
                  analysisData.similarity >= 80 ? "text-green-500" : 
                  analysisData.similarity >= 60 ? "text-yellow-500" : 
                  "text-red-500"
                }`}>
                  {analysisData.similarity}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-4 mb-6">
                <div 
                  className={`h-4 rounded-full ${getScoreColor(analysisData.similarity)}`} 
                  style={{ width: `${analysisData.similarity}%` }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Your handwriting has been analyzed against {fontName}. Here's a breakdown of various attributes:
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
                Your handwriting shows a {analysisData.similarity}% similarity to {fontName}. 
                You have excellent pressure consistency, indicating confident writing. 
                Your character spacing and line consistency are good, but there's room for improvement 
                in character formation, particularly with letters like 'r' and 't'.
              </p>
              <p className="text-sm mt-4">
                For improved similarity to {fontName}, focus on maintaining consistent slant angles 
                and practicing the character formations highlighted in the details tab.
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
                {analysisData.details.map((detail, index) => (
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
