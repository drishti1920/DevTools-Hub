
import { useState } from "react";
import { Copy, Upload, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Base64Encoder() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (mode === "encode") {
      encodeToBase64(e.target.value);
    } else {
      decodeFromBase64(e.target.value);
    }
  };
  
  const encodeToBase64 = (text: string) => {
    try {
      const encoded = window.btoa(text);
      setOutput(encoded);
    } catch (error) {
      console.error("Error encoding to Base64:", error);
      setOutput("Error: Could not encode to Base64");
    }
  };
  
  const decodeFromBase64 = (base64: string) => {
    try {
      const decoded = window.atob(base64);
      setOutput(decoded);
    } catch (error) {
      console.error("Error decoding from Base64:", error);
      setOutput("Error: Invalid Base64 input");
    }
  };
  
  const switchMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    setOutput("");
    
    // Process after state update
    setTimeout(() => {
      if (newMode === "encode") {
        encodeToBase64(output);
      } else {
        decodeFromBase64(output);
      }
    }, 0);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    if (mode === "encode") {
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setOutput(base64);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          decodeFromBase64(text);
        } catch (error) {
          toast.error("Error decoding file");
        }
      };
      reader.readAsText(file);
    }
  };
  
  const copyToClipboard = () => {
    if (!output) {
      toast.error("No output to copy");
      return;
    }
    
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Base64 {mode === "encode" ? "Encoder" : "Decoder"}</h2>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={switchMode}
        >
          <ArrowDownUp className="h-4 w-4" />
          Switch to {mode === "encode" ? "Decode" : "Encode"}
        </Button>
      </div>
      
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full md:w-auto mb-4 p-1 bg-card">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="file">File</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Input</h3>
              <Textarea
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                className="font-mono h-[300px]"
                value={input}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Output</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              </div>
              
              <Textarea
                readOnly
                className="font-mono bg-background h-[300px]"
                value={output}
                placeholder={mode === "encode" ? "Encoded Base64 will appear here..." : "Decoded text will appear here..."}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="file" className="mt-0">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    {mode === "encode" 
                      ? "Upload a file to encode to Base64" 
                      : "Upload a Base64 file to decode"}
                  </p>
                </div>
              </label>
            </div>
            
            {output && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Result</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                
                <div className="bg-background border border-border rounded-lg p-4 max-h-[300px] overflow-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap overflow-auto">{output}</pre>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="rounded-lg bg-secondary/50 p-4">
        <h3 className="font-medium mb-2">About Base64</h3>
        <p className="text-sm text-muted-foreground">
          Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. 
          It's commonly used when there is a need to encode binary data, especially when that data needs to be stored 
          and transferred over media that are designed to deal with text.
        </p>
      </div>
    </div>
  );
}
