
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RegisterForm({ isSubmitting }: { isSubmitting: boolean }) {
  const { register } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || localSubmitting) return;
    
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLocalSubmitting(true);
    
    try {
      toast({
        title: "Creating account",
        description: "Please wait while we set up your account...",
      });
      
      // Create a timeout promise
      const registerPromise = register(email, password, name);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Registration timed out after 15 seconds')), 15000);
      });
      
      // Race the registration against the timeout
      await Promise.race([registerPromise, timeoutPromise]);
      
      toast({
        title: "Registration successful",
        description: "Welcome to Script-Check!",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive"
      });
    } finally {
      setLocalSubmitting(false);
    }
  };

  const effectiveSubmitting = isSubmitting || localSubmitting;

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="pl-10"
            required
            disabled={effectiveSubmitting}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
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
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
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
            Creating Account...
          </>
        ) : "Create Account"}
      </Button>
    </form>
  );
}
