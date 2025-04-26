
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/aa82dfae-8d34-412f-b875-304a838a69a5.png" 
        alt="Script Check Logo" 
        className="h-8 w-8 mr-2" 
      />
      <Image className="h-8 w-8 text-scriptGreen" />
      <span className="hidden font-bold sm:inline-block text-xl">Script-Check</span>
    </Link>
  );
};
