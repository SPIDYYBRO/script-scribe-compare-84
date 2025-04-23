
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalysisRecord } from "@/utils/analysisService";

interface HistoryItemProps {
  item: AnalysisRecord;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
  getExpiryMessage: (date: string) => string;
}

export function HistoryItem({ 
  item, 
  onDelete, 
  formatDate, 
  getExpiryMessage 
}: HistoryItemProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-36 h-36 bg-muted flex items-center justify-center">
          <img 
            src={item.image_url} 
            alt="Handwriting sample" 
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row justify-between mb-2">
            <div>
              <h3 className="font-medium">{formatDate(item.created_at)}</h3>
              <p className="text-sm text-muted-foreground">
                Compared to {item.comparison_target}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className={`font-bold ${
                item.similarity_score >= 80 ? "text-green-500" : 
                item.similarity_score >= 60 ? "text-yellow-500" : 
                "text-red-500"
              }`}>
                {item.similarity_score}% Similarity
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">
              {getExpiryMessage(item.created_at)}
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/analysis/${item.id}`}>View Results</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

