
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/script-check-logo.png" 
        alt="Script Check Logo" 
        className="h-8 w-8 mr-2" 
      />
      <span className="hidden font-bold sm:inline-block text-xl">Script-Check</span>
    </Link>
  );
};
