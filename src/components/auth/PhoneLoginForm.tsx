
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PhoneLoginForm({ isSubmitting }: { isSubmitting: boolean }) {
  const { loginWithPhone } = useAuth();
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await loginWithPhone(phone);
      setPhoneVerificationSent(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to send verification code",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (!phoneVerificationSent) {
    return (
      <form onSubmit={handleSendVerification} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (123) 456-7890"
              className="pl-10"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-scriptGreen hover:bg-scriptGreen/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : "Send Verification Code"}
        </Button>
      </form>
    );
  }

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="verification-code">Verification Code</Label>
        <Input
          id="verification-code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="123456"
          required
          disabled={isSubmitting}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-scriptGreen hover:bg-scriptGreen/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : "Verify and Login"}
      </Button>
      <Button 
        variant="link" 
        type="button"
        onClick={() => {
          setPhoneVerificationSent(false);
          setVerificationCode("");
        }}
        className="w-full"
        disabled={isSubmitting}
      >
        Use a different phone number
      </Button>
    </form>
  );
}
