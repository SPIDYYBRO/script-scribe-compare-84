
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAnalysisHistory, removeAnalysisRecord, type AnalysisRecord } from "@/utils/analysisService";
import { EmptyHistory } from "./EmptyHistory";
import { HistoryHeader } from "./HistoryHeader";
import { HistoryItem } from "./HistoryItem";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export default function HistoryList() {
  const { toast } = useToast();
  const [historyItems, setHistoryItems] = useState<AnalysisRecord[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
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
    
    return daysUntilExpiry <= 1 ? "Expires today" : `Expires in ${daysUntilExpiry} days`;
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
      <HistoryHeader 
        title="Analysis History" 
        subtitle="Analyses are stored for 30 days" 
      />
      
      {historyItems.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div className="space-y-4">
          {historyItems.map(item => (
            <HistoryItem
              key={item.id}
              item={item}
              onDelete={deleteItem}
              formatDate={formatDate}
              getExpiryMessage={getExpiryMessage}
            />
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

