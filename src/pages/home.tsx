import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { libraries } from "@/constants/data";
import { Github, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-background">
      {/* Fixed: Removed className prop from Pattern */}
      <Pattern>
        
        {/* Mode Toggle positioned absolutely at Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <ModeToggle />
        </div>

        {/* Main Centered Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 space-y-8">
          
          {/* Top GitHub button */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 border border-border/50 rounded-full bg-secondary/30 backdrop-blur-sm px-4 py-1.5 transition-all hover:bg-secondary/50 hover:border-border"
          >
            <div className="flex items-center gap-2">
              <Github size={16} className="text-foreground/80" />
              <span className="text-sm text-foreground/80 font-medium">View on GitHub</span>
            </div>
            <ArrowRight size={16} className="text-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Main Title & Subtitle */}
          <div className="text-center max-w-3xl space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
              Universal Link <br className="hidden md:block" /> Preview Generator
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Paste any URL and instantly get metadata, OG tags, and social previews for your projects.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {libraries.map((library) => (
              <span
                key={library}
                className="text-xs md:text-sm text-muted-foreground bg-secondary/50 border border-border/50 rounded-full px-3 py-1"
              >
                {library}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="/generate"
            className="mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            Start Generating
            <ArrowRight size={18} />
          </a>

        </div>
      </Pattern>
    </div>
  );
}
