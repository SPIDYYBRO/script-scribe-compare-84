
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DetailedAnalysisCardProps {
  title: string;
  icon: React.ReactNode;
  metrics: Record<string, number>;
  details?: string[];
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
}

const DetailedAnalysisCard = ({ 
  title, 
  icon, 
  metrics, 
  details, 
  strengths, 
  weaknesses, 
  recommendations 
}: DetailedAnalysisCardProps) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate the average score for all metrics
  const averageScore = Object.values(metrics).reduce((sum, val) => sum + val, 0) / Object.values(metrics).length;
  
  return (
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
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <Progress value={value} className={`h-2 ${getScoreColor(value)}`} />
            </div>
          ))}

          {details && details.length > 0 && (
            <Alert className="mt-4 bg-muted">
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1">
                  {details.map((detail, index) => (
                    <li key={index} className="text-sm">{detail}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <Accordion type="single" collapsible className="w-full mt-4">
            {strengths && strengths.length > 0 && (
              <AccordionItem value="strengths">
                <AccordionTrigger className="text-sm font-medium text-green-600 hover:text-green-700">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Strengths
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {strengths.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {weaknesses && weaknesses.length > 0 && (
              <AccordionItem value="weaknesses">
                <AccordionTrigger className="text-sm font-medium text-amber-600 hover:text-amber-700">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-500" />
                    Areas for Improvement
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {weaknesses.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {recommendations && recommendations.length > 0 && (
              <AccordionItem value="recommendations">
                <AccordionTrigger className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-blue-500" />
                    Recommended Exercises
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {recommendations.map((item, i) => (
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

export default DetailedAnalysisCard;
