
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";

export function EmptyHistory() {
  return (
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
  );
}

