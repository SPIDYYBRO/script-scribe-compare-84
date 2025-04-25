
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { type EnhancedAnalysisData } from './types';

interface ImprovementPlanProps {
  analysisData: EnhancedAnalysisData;
}

const ImprovementPlan = ({ analysisData }: ImprovementPlanProps) => {
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

  const categories = [
    { name: "Character Spacing", key: "characterSpacing", score: analysisData.spacingAnalysis.letterSpacing },
    { name: "Line Consistency", key: "lineConsistency", score: analysisData.baselineAnalysis.consistency },
    { name: "Character Formation", key: "characterFormation", score: analysisData.formationAnalysis.ascenders.consistency },
    { name: "Pressure Consistency", key: "pressure", score: analysisData.pressureAnalysis.consistency },
    { name: "Writing Slant", key: "slant", score: analysisData.baselineAnalysis.angle }
  ].sort((a, b) => a.score - b.score);

  const priorityAreas = categories.slice(0, 2);

  return (
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

          <div>
            <h3 className="text-md font-semibold mb-3">Daily Practice Routine</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Warm up with basic strokes (5 minutes): Practice straight lines, curves, and loops.</li>
              <li>Letter formation (10 minutes): Focus on the letters identified as needing improvement in the details tab.</li>
              <li>Word practice (5 minutes): Write common words that include your challenging letters.</li>
              <li>Sentence practice (5 minutes): Write a sentence containing all letters of the alphabet.</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementPlan;
