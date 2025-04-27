
import React from 'react';
import { type EnhancedAnalysisData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertTriangle, Lightbulb, Pen, Ruler } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Custom icon components for missing lucide icons
const Grip = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="5" r="1"/>
    <circle cx="19" cy="5" r="1"/>
    <circle cx="5" cy="5" r="1"/>
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
    <circle cx="12" cy="19" r="1"/>
    <circle cx="19" cy="19" r="1"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>
);

const Baseline = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 20h16"/>
    <path d="M8 5v10"/>
    <path d="M12 5v10"/>
    <path d="M16 5v10"/>
  </svg>
);

const Square = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  </svg>
);

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

  const renderAnalysisSection = (title: string, data: any, icon: React.ReactNode) => {
    // Calculate average score for this section
    const numericValues = Object.entries(data)
      .filter(([key, value]) => typeof value === 'number' && !['id', 'userId', 'createdAt', 'updatedAt'].includes(key))
      .map(([_, value]) => value as number);
    
    const sectionAverageScore = numericValues.length > 0 
      ? Math.round(numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length) 
      : 0;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
            <span className={`ml-auto text-xs font-normal px-2 py-1 rounded-full ${
              sectionAverageScore >= 80 ? "bg-green-100 text-green-800" :
              sectionAverageScore >= 60 ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            }`}>
              {Math.round(sectionAverageScore)}% {
                sectionAverageScore >= 80 ? "Strong" :
                sectionAverageScore >= 60 ? "Average" :
                "Needs Work"
              }
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data).filter(([key, value]) => typeof data[key] === 'number').map(([key, value]) => (
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
  };

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
