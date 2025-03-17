
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ToolsLayout from "./components/tools/ToolsLayout";
import JsonGenerator from "./pages/tools/JsonGenerator";
import SvgToJsx from "./pages/tools/SvgToJsx";
import ColorGradient from "./pages/tools/ColorGradient";
import Base64Encoder from "./pages/tools/Base64Encoder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            
            {/* Tools Routes */}
            <Route path="/tools" element={<ToolsLayout />}>
              <Route path="json-generator" element={<JsonGenerator />} />
              <Route path="svg-jsx" element={<SvgToJsx />} />
              <Route path="gradient" element={<ColorGradient />} />
              <Route path="base64" element={<Base64Encoder />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
