
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pen, Grip, Baseline, Square, Ruler } from "lucide-react";
import { type EnhancedAnalysisData } from './types';

interface TechnicalAnalysisProps {
  analysisData: EnhancedAnalysisData;
}

const TechnicalAnalysis = ({ analysisData }: TechnicalAnalysisProps) => {
  const renderAnalysisSection = (title: string, data: any, icon: React.ReactNode) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]: [string, any]) => {
            if (key === 'details') return null;
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <Progress value={value as number} className="h-2" />
              </div>
            );
          })}
          {data.details && (
            <Alert className="mt-4 bg-muted">
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1">
                  {data.details.map((detail: string, index: number) => (
                    <li key={index} className="text-sm">{detail}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {renderAnalysisSection("Stroke Analysis", analysisData.strokeAnalysis, <Pen className="h-5 w-5" />)}
      {renderAnalysisSection("Grip Analysis", analysisData.gripAnalysis, <Grip className="h-5 w-5" />)}
      {renderAnalysisSection("Baseline Analysis", analysisData.baselineAnalysis, <Baseline className="h-5 w-5" />)}
      {renderAnalysisSection("Spacing Analysis", analysisData.spacingAnalysis, <Square className="h-5 w-5" />)}
      {renderAnalysisSection("Pressure Analysis", analysisData.pressureAnalysis, <Ruler className="h-5 w-5" />)}
    </div>
  );
};

export default TechnicalAnalysis;
