
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/components/ui/use-toast";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    toast({
      title: `${theme === 'light' ? 'Dark' : 'Light'} mode activated`,
      description: `You've switched to ${theme === 'light' ? 'dark' : 'light'} mode.`,
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
    </Button>
  );
}
