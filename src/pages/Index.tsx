
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ToolGrid from "@/components/tools/ToolGrid";
import { cn } from "@/lib/utils";

export default function Index() {
  const [toolsSectionVisible, setToolsSectionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const toolsSection = document.getElementById("tools");
      if (toolsSection) {
        const rect = toolsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        setToolsSectionVisible(isVisible);
      }
    };

    // Call once to initialize
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Hero />
      
      <section 
        id="tools" 
        className="py-20 px-4 relative"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute bottom-0 left-1/3 w-2/3 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        
        <div className="container">
          <div className={cn(
            "mb-12 text-center transition-all duration-700 transform",
            toolsSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="h2 mb-4">Developer Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our collection of tools designed to make your development workflow smoother and more efficient.
              All tools are free to use and built with developers in mind.
            </p>
          </div>
          
          <div className={cn(
            "transition-all duration-700 delay-200 transform",
            toolsSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <ToolGrid />
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 relative border-t">
        <div className="container">
          <div className="text-center">
            <h2 className="h3 mb-6">Ready to streamline your development workflow?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              DevToolHub is constantly evolving with new tools and improvements.
              Bookmark this page to stay updated with the latest additions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
