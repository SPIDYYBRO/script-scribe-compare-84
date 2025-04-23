
import Navbar from "@/components/layout/Navbar";
import HistoryList from "@/components/history/HistoryList";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function History() {
  const { user, isLoading } = useAuth();
  
  // If user is not logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <HistoryList />
      </main>
    </div>
  );
}
