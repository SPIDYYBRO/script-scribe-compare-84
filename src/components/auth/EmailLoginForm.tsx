
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmailLoginForm({ isSubmitting }: { isSubmitting: boolean }) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || localSubmitting) return;
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setLocalSubmitting(true);
    
    try {
      toast({
        title: "Logging in",
        description: "Please wait while we authenticate you...",
      });
      
      // Create a timeout promise
      const loginPromise = login(email, password);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Login timed out after 15 seconds')), 15000);
      });
      
      // Race the login against the timeout
      await Promise.race([loginPromise, timeoutPromise]);
      
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setLocalSubmitting(false);
    }
  };

  const effectiveSubmitting = isSubmitting || localSubmitting;

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="pl-10"
            required
            disabled={effectiveSubmitting}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={effectiveSubmitting}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-scriptGreen hover:bg-scriptGreen/90"
        disabled={effectiveSubmitting}
      >
        {effectiveSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : "Login"}
      </Button>
    </form>
  );
}
