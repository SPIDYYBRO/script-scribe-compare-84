
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { user, isLoading } = useAuth();
  
  // If user is already logged in, redirect to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-scriptYellow/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-scriptGreen">Script-Check</h1>
          <p className="text-muted-foreground mt-2">
            Analyze and compare your handwriting
          </p>
        </div>
        
        {isLoading ? (
          <div className="bg-white p-8 rounded-lg shadow-lg border flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 text-scriptGreen animate-spin mb-4" />
            <p className="text-muted-foreground">Authenticating...</p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <AuthForm />
          </div>
        )}
      </div>
    </div>
  );
}
