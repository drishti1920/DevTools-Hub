
import { useState } from "react";
import { Copy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SvgToJsx() {
  const [svgInput, setSvgInput] = useState<string>("");
  const [jsxOutput, setJsxOutput] = useState<string>("");
  
  const handleSvgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSvgInput(e.target.value);
    if (e.target.value) {
      convertSvgToJsx(e.target.value);
    } else {
      setJsxOutput("");
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.svg')) {
      toast.error("Please upload an SVG file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgInput(content);
      convertSvgToJsx(content);
    };
    reader.readAsText(file);
  };
  
  const convertSvgToJsx = (svg: string) => {
    try {
      // Check if input is valid SVG (basic check)
      if (!svg.includes('<svg') || !svg.includes('</svg>')) {
        toast.error("Invalid SVG format");
        setJsxOutput("");
        return;
      }
      
      // Replace HTML attributes with JSX attributes
      let jsx = svg
        // Convert style attribute to JSX style object
        .replace(/style="([^"]*)"/g, (match, style) => {
          const cssProperties = style.split(';').filter(Boolean);
          const jsxProperties = cssProperties.map(prop => {
            const [key, value] = prop.split(':').map(s => s.trim());
            // Convert kebab-case to camelCase
            const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            return `${camelKey}: "${value}"`;
          });
          return `style={{${jsxProperties.join(', ')}}}`;
        })
        // Convert class to className
        .replace(/class=/g, 'className=')
        // Convert kebab-case attributes to camelCase
        .replace(/([a-z])-([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`)
        // Special attributes conversion
        .replace(/xlink:href=/g, 'xlinkHref=')
        .replace(/clip-path=/g, 'clipPath=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/fill-opacity=/g, 'fillOpacity=')
        .replace(/font-family=/g, 'fontFamily=')
        .replace(/font-size=/g, 'fontSize=')
        .replace(/text-anchor=/g, 'textAnchor=');
      
      // Format for React component
      const formattedJsx = `const SvgIcon = () => (\n  ${jsx}\n);\n\nexport default SvgIcon;`;
      
      setJsxOutput(formattedJsx);
    } catch (error) {
      console.error("Error converting SVG to JSX:", error);
      toast.error("Error converting SVG to JSX");
      setJsxOutput("");
    }
  };
  
  const copyToClipboard = () => {
    if (!jsxOutput) {
      toast.error("No JSX to copy");
      return;
    }
    
    navigator.clipboard.writeText(jsxOutput);
    toast.success("JSX copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">SVG Input</h2>
            <div className="flex items-center">
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="hidden"
                id="svg-upload"
              />
              <label htmlFor="svg-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-1" /> Upload SVG
                  </span>
                </Button>
              </label>
            </div>
          </div>
          
          <Textarea
            placeholder="Paste your SVG here..."
            className="font-mono h-[500px]"
            value={svgInput}
            onChange={handleSvgChange}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">JSX Output</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              disabled={!jsxOutput}
            >
              <Copy className="h-4 w-4 mr-1" /> Copy JSX
            </Button>
          </div>
          
          <div className="relative">
            <Textarea
              readOnly
              className="font-mono bg-background h-[500px]"
              value={jsxOutput}
              placeholder="JSX will appear here..."
            />
          </div>
        </div>
      </div>
      
      <div className="rounded-lg bg-secondary/50 p-4">
        <h3 className="font-medium mb-2">Usage Guide</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Paste your SVG code or upload an SVG file</li>
          <li>The converter will automatically transform it to React JSX</li>
          <li>Copy the generated JSX and use it in your React components</li>
          <li>For complex SVGs, you may need to make additional manual adjustments</li>
        </ul>
      </div>
    </div>
  );
}
