
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

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
        
        <div className="bg-white p-8 rounded-lg shadow-lg border">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
