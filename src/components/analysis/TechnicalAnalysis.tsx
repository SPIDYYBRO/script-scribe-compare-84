
import React from 'react';
import { type EnhancedAnalysisData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TechnicalAnalysisProps {
  analysisData: EnhancedAnalysisData;
}

const TechnicalAnalysis = ({ analysisData }: TechnicalAnalysisProps) => {
  // Extract all the required data and metrics from analysisData
  const { strokeAnalysis, gripAnalysis, baselineAnalysis, spacingAnalysis, pressureAnalysis } = analysisData;

  // Calculate overall technical score
  const calculateOverallScore = () => {
    const scores = [
      strokeAnalysis.quality,
      gripAnalysis.control,
      baselineAnalysis.stability,
      spacingAnalysis.letterSpacing,
      pressureAnalysis.consistency
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const overallScore = calculateOverallScore();

  const renderAnalysisSection = (title: string, data: any, icon: React.ReactNode) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
          <span className={`ml-auto text-xs font-normal px-2 py-1 rounded-full ${
            averageScore >= 80 ? "bg-green-100 text-green-800" :
            averageScore >= 60 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
            {Math.round(averageScore)}% {
              averageScore >= 80 ? "Strong" :
              averageScore >= 60 ? "Average" :
              "Needs Work"
            }
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(data).filter(([key]) => typeof data[key] === 'number').map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <Progress value={value as number} className="h-2" />
            </div>
          ))}

          <Accordion type="single" collapsible className="w-full mt-4">
            {data.strengths && data.strengths.length > 0 && (
              <AccordionItem value="strengths">
                <AccordionTrigger className="text-sm font-medium text-green-600 hover:text-green-700">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Strengths
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.strengths.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {data.weaknesses && data.weaknesses.length > 0 && (
              <AccordionItem value="weaknesses">
                <AccordionTrigger className="text-sm font-medium text-amber-600 hover:text-amber-700">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-500" />
                    Areas for Improvement
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.weaknesses.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {data.recommendations && data.recommendations.length > 0 && (
              <AccordionItem value="recommendations">
                <AccordionTrigger className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-blue-500" />
                    Recommended Exercises
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.recommendations.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Overall Technical Score</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            overallScore >= 80 ? "bg-green-100 text-green-800" :
            overallScore >= 60 ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
            {overallScore}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {overallScore >= 80 ? "Excellent technical control across all aspects." :
           overallScore >= 60 ? "Good foundation with room for improvement in specific areas." :
           "Focus needed on fundamental writing techniques."}
        </p>
      </div>

      {renderAnalysisSection("Stroke Analysis", strokeAnalysis, <Pen className="h-5 w-5" />)}
      {renderAnalysisSection("Grip Analysis", gripAnalysis, <Grip className="h-5 w-5" />)}
      {renderAnalysisSection("Baseline Analysis", baselineAnalysis, <Baseline className="h-5 w-5" />)}
      {renderAnalysisSection("Spacing Analysis", spacingAnalysis, <Square className="h-5 w-5" />)}
      {renderAnalysisSection("Pressure Analysis", pressureAnalysis, <Ruler className="h-5 w-5" />)}
    </div>
  );
};

export default TechnicalAnalysis;
