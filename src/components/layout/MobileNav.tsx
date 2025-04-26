
import { Link, useLocation } from "react-router-dom";
import { Image, History, Settings, Menu, X, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { name: "Analyze", path: "/dashboard", icon: <Image className="h-5 w-5" /> },
  { name: "History", path: "/history", icon: <History className="h-5 w-5" /> },
  { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> }
];

export const MobileNav = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      toast({
        title: "Logging out",
        description: "Please wait while we log you out..."
      });
      
      await logout();
    } catch (error) {
      console.error('MobileNav: Error during logout:', error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive"
      });
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-2 rounded-md ${
                  isActive(link.path) 
                    ? 'bg-muted text-scriptGreen' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 justify-start p-2 rounded-md w-full text-left font-normal hover:bg-muted text-red-500"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};
