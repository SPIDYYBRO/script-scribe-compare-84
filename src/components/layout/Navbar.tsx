
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { 
  User, 
  Image, 
  History, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account."
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const navLinks = [
    { name: "Analyze", path: "/dashboard", icon: <Image className="h-5 w-5" /> },
    { name: "History", path: "/history", icon: <History className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Image className="h-8 w-8 text-scriptGreen" />
            <span className="hidden font-bold sm:inline-block text-xl">Script-Check</span>
          </Link>
        </div>

        {user && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? 'text-scriptGreen' : 'text-muted-foreground'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
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
          </>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoUrl} />
                  <AvatarFallback className="bg-scriptGreen text-white">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" className="bg-scriptGreen hover:bg-scriptGreen/90">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {user && mobileMenuOpen && (
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
              className="flex items-center gap-3 justify-start p-2 rounded-md w-full text-left font-normal hover:bg-muted"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
