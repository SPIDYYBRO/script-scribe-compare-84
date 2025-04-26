
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { NavLogo } from "./NavLogo";
import { UserMenu } from "./UserMenu";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLogo />
        </div>

        {user && (
          <>
            <DesktopNav />
            <MobileNav />
          </>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <UserMenu />
          ) : (
            <Button asChild variant="default" className="bg-scriptGreen hover:bg-scriptGreen/90">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
