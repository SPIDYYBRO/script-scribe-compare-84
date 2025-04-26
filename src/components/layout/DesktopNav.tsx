
import { Link, useLocation } from "react-router-dom";
import { Image, History, Settings } from "lucide-react";

const navLinks = [
  { name: "Analyze", path: "/dashboard", icon: <Image className="h-5 w-5" /> },
  { name: "History", path: "/history", icon: <History className="h-5 w-5" /> },
  { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> }
];

export const DesktopNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
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
  );
};
