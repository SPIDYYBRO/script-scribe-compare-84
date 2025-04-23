
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFont, FontChoice } from "@/contexts/FontContext";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function FontSettings() {
  const { font, setFont, fontName } = useFont();
  const { toast } = useToast();
  
  const handleFontChange = (value: FontChoice) => {
    setFont(value);
    toast({
      title: "Font updated",
      description: `Default font has been changed to ${value === 'times' ? 'Times New Roman' : value === 'arial' ? 'Arial' : value === 'calibri' ? 'Calibri' : 'Helvetica'}.`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Font Settings</CardTitle>
        <CardDescription>
          Choose the default font to compare your handwriting against.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={font} 
          onValueChange={handleFontChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="times" id="times" />
            <Label htmlFor="times" className="font-times text-lg">
              Times New Roman
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="arial" id="arial" />
            <Label htmlFor="arial" className="font-arial text-lg">
              Arial
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="calibri" id="calibri" />
            <Label htmlFor="calibri" className="font-calibri text-lg">
              Calibri
            </Label>
          </div>
          
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="helvetica" id="helvetica" />
            <Label htmlFor="helvetica" className="font-helvetica text-lg">
              Helvetica
            </Label>
          </div>
        </RadioGroup>
        
        <div className="mt-8 p-4 bg-muted rounded-md">
          <p className="font-medium mb-2">Font Preview</p>
          <p className={`font-${font} text-lg`}>
            The quick brown fox jumps over the lazy dog
          </p>
          <p className={`font-${font} text-xs mt-2 text-muted-foreground`}>
            Currently using: {fontName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
