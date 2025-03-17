
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FileJson, Code, PaintBucket, Slash, ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tools = [
  {
    id: "json-generator",
    name: "JSON Generator",
    icon: <FileJson className="h-4 w-4" />,
    path: "/tools/json-generator",
  },
  {
    id: "svg-jsx",
    name: "SVG to JSX",
    icon: <Code className="h-4 w-4" />,
    path: "/tools/svg-jsx",
  },
  {
    id: "gradient",
    name: "Color Gradient",
    icon: <PaintBucket className="h-4 w-4" />,
    path: "/tools/gradient",
  },
  {
    id: "base64",
    name: "Base64 Encoder",
    icon: <Slash className="h-4 w-4" />,
    path: "/tools/base64",
  },
];

export default function ToolsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("");
  
  useEffect(() => {
    // Extract the tool ID from the current path
    const pathParts = location.pathname.split('/');
    const currentToolId = pathParts[pathParts.length - 1];
    
    if (currentToolId && tools.some(tool => tool.id === currentToolId)) {
      setActiveTab(currentToolId);
    } else if (tools.length > 0) {
      // Redirect to first tool if no valid tool is in the URL
      navigate(tools[0].path, { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleTabChange = (value: string) => {
    const selectedTool = tools.find(tool => tool.id === value);
    if (selectedTool) {
      navigate(selectedTool.path);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          
          <h1 className="text-2xl font-bold">Developer Tools</h1>
        </div>
      </div>
      
      {/* Tools Navigation */}
      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full md:w-auto mb-4 p-1 bg-card overflow-x-auto">
            {tools.map((tool) => (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="flex-shrink-0 whitespace-nowrap"
              >
                {tool.icon}
                <span className="ml-2">{tool.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Tool Content Area */}
      <div className="bg-card/40 backdrop-blur-sm border border-border/50 p-4 md:p-6 rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
