
import { ArrowRight, Code, Github, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-16">
      <section className="py-12 md:py-20 px-4">
        <div className="container">
          <div className={cn(
            "max-w-3xl mx-auto transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h1 className="h2 mb-6 text-center">About DevToolHub</h1>
            <p className="text-xl mb-8 text-muted-foreground text-center">
              We're building the ultimate collection of development tools to simplify your workflow.
            </p>
            
            <div className="glass-card p-6 rounded-xl mb-8">
              <p className="mb-4">
                DevToolHub was created with a simple mission: to provide developers with a beautiful, 
                unified platform for all the small utilities they need during development.
              </p>
              <p>
                No more bookmarking dozens of different utility websites or installing multiple apps. 
                We've brought everything together in one elegant, developer-friendly interface.
              </p>
            </div>
          </div>

          <div className={cn(
            "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-200 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="glass-card p-6 rounded-xl">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Built for Developers</h3>
              <p className="text-muted-foreground text-sm">
                Created by developers who understand the needs of the community. 
                Every tool is designed with real-world use cases in mind.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Constantly Evolving</h3>
              <p className="text-muted-foreground text-sm">
                We're continuously adding new tools and improving existing ones
                based on community feedback and emerging development trends.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Open Source</h3>
              <p className="text-muted-foreground text-sm">
                DevToolHub is open source. We welcome contributions from the community
                to make our platform even better for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 border-t">
        <div className="container">
          <div className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700 delay-300 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h2 className="h3 mb-6">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Have suggestions for new tools or improvements? Want to contribute to the project?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full group" asChild>
                <a href="https://github.com/username/devtoolhub" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repository
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full group" asChild>
                <a href="mailto:contact@devtoolhub.com">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
