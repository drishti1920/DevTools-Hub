
import { ArrowDownCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className={`space-y-6 max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block glass-card px-4 py-1.5 rounded-full">
              <p className="text-sm font-medium text-primary">Developer Tools • All in One Place</p>
            </div>
            
            <h1 className="h1 font-bold">
              The Ultimate <span className="text-primary">Developer Toolkit</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All the utilities you need in your development workflow, beautifully designed and 
              ready to use. No more juggling between different websites.
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Button size="lg" className="rounded-full group" onClick={scrollToTools}>
              Explore Tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="https://github.com/username/devtoolhub" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>

          <div className={`pt-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              variant="ghost"
              size="sm"
              className="animate-bounce"
              onClick={scrollToTools}
            >
              <ArrowDownCircle className="h-5 w-5 mr-2" />
              Scroll to discover
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
