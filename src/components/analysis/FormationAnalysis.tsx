
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pen } from "lucide-react";
import { type EnhancedAnalysisData } from './types';

interface FormationAnalysisProps {
  formationAnalysis: EnhancedAnalysisData['formationAnalysis'];
}

const FormationAnalysis = ({ formationAnalysis }: FormationAnalysisProps) => {
  const renderSection = (title: string, data: any) => (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pen className="h-5 w-5" />
            <span>{title} Formation</span>
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
              <Alert className="bg-muted">
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
    </div>
  );

  return (
    <div className="space-y-8">
      {renderSection("Ascenders", formationAnalysis.ascenders)}
      {renderSection("Descenders", formationAnalysis.descenders)}
    </div>
  );
};

export default FormationAnalysis;
