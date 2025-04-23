
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAnalysisHistory, removeAnalysisRecord } from "@/utils/analysisService";

export default function HistoryList() {
  const { toast } = useToast();
  const [historyItems, setHistoryItems] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load history on mount and when items are deleted
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const history = await getAnalysisHistory();
        setHistoryItems(history || []);
      } catch (error) {
        console.error("Failed to load history:", error);
        toast({
          title: "Error loading history",
          description: "There was a problem retrieving your analysis history.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, [toast]);
  
  const deleteItem = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await removeAnalysisRecord(itemToDelete);
        setHistoryItems(historyItems.filter(item => item.id !== itemToDelete));
        toast({
          title: "Analysis deleted",
          description: "The analysis has been removed from your history.",
        });
      } catch (error) {
        console.error("Failed to delete item:", error);
        toast({
          title: "Delete failed",
          description: "There was a problem deleting the analysis.",
          variant: "destructive",
        });
      } finally {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const getExpiryMessage = (dateString: string) => {
    const currentDate = new Date();
    const analysisDate = new Date(dateString);
    const expiryDate = new Date(analysisDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 days retention
    
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 1) {
      return "Expires today";
    } else {
      return `Expires in ${daysUntilExpiry} days`;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scriptGreen"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analysis History</h2>
        <p className="text-sm text-muted-foreground">Analyses are stored for 30 days</p>
      </div>
      
      {historyItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Image className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No history yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You haven't performed any handwriting analyses yet. 
              Upload an image to get started.
            </p>
            <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90">
              <Link to="/dashboard">Start Analysis</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {historyItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-36 h-36 bg-muted flex items-center justify-center">
                  <img 
                    src={item.imageUrl} 
                    alt="Handwriting sample" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{formatDate(item.date)}</h3>
                      <p className="text-sm text-muted-foreground">
                        Compared to {item.comparisonTarget}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className={`font-bold ${
                        item.similarityScore >= 80 ? "text-green-500" : 
                        item.similarityScore >= 60 ? "text-yellow-500" : 
                        "text-red-500"
                      }`}>
                        {item.similarityScore}% Similarity
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">
                      {getExpiryMessage(item.date)}
                    </span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/analysis/${item.id}`}>View Results</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this analysis? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
