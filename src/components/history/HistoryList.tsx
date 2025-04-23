
import { useState } from "react";
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

// Mock history data
const mockHistoryItems = [
  {
    id: "analysis-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    image: "/placeholder.svg",
    comparisonType: "font",
    comparisonTarget: "Times New Roman",
    similarityScore: 68,
  },
  {
    id: "analysis-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    image: "/placeholder.svg",
    comparisonType: "font",
    comparisonTarget: "Arial",
    similarityScore: 72,
  },
  {
    id: "analysis-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    image: "/placeholder.svg",
    comparisonType: "image",
    comparisonTarget: "Custom Image",
    similarityScore: 85,
  },
  {
    id: "analysis-4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
    image: "/placeholder.svg",
    comparisonType: "font",
    comparisonTarget: "Times New Roman",
    similarityScore: 65,
  },
  {
    id: "analysis-5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28), // 28 days ago
    image: "/placeholder.svg",
    comparisonType: "font",
    comparisonTarget: "Helvetica",
    similarityScore: 70,
  }
];

export default function HistoryList() {
  const { toast } = useToast();
  const [historyItems, setHistoryItems] = useState(mockHistoryItems);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  const deleteItem = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setHistoryItems(historyItems.filter(item => item.id !== itemToDelete));
      toast({
        title: "Analysis deleted",
        description: "The analysis has been removed from your history.",
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  const getExpiryMessage = (date: Date) => {
    const currentDate = new Date();
    const expiryDate = new Date(date);
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 days retention
    
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry <= 1) {
      return "Expires today";
    } else {
      return `Expires in ${daysUntilExpiry} days`;
    }
  };

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
                    src={item.image} 
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
