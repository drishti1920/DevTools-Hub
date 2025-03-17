
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  className?: string;
  available?: boolean;
}

export default function ToolCard({ title, description, icon, href, className, available = false }: ToolCardProps) {
  return (
    <a 
      href={available ? href : "#"} 
      className={cn(
        "glass-card h-full group flex flex-col rounded-xl p-6 relative overflow-hidden",
        !available && "opacity-85 cursor-not-allowed",
        className
      )}
      onClick={(e) => !available && e.preventDefault()}
    >
      {!available && (
        <div className="absolute top-2 right-2 bg-secondary text-xs py-1 px-2 rounded-full">
          Coming Soon
        </div>
      )}
      
      <div className="bg-primary/10 text-primary p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <p className="text-muted-foreground mb-4 text-sm flex-grow">{description}</p>
      
      <div className={cn(
        "flex items-center text-sm font-medium",
        available ? "text-primary" : "text-muted-foreground"
      )}>
        {available ? (
          <>
            Launch Tool
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        ) : (
          "Coming Soon"
        )}
      </div>
    </a>
  );
}
