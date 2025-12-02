import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { libraries } from "@/constants/data";
import { Github, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-background">
      {/* Pattern Background */}
      <Pattern>
        
        {/* Mode Toggle - Absolute Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <ModeToggle />
        </div>

        {/* Main Content - Using your .layout and .center classes */}
        <div className="relative z-10 h-full center flex-col gap-8 layout text-center">
          
          {/* Top GitHub button */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group center gap-4 border border-line rounded-full bg-secondary/50 backdrop-blur-sm px-4 py-1.5 transition-all hover:bg-secondary hover:border-main/20"
          >
            <div className="center gap-2">
              <Github size={16} className="text-main" />
              <span className="text-sm text-main font-medium">View on GitHub</span>
            </div>
            <ArrowRight size={16} className="text-muted group-hover:text-main group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-main to-main/40 dark:to-main/50">
              Universal Link <br className="hidden md:block" /> Preview Generator
            </h1>
            <p className="text-muted text-lg md:text-xl leading-relaxed">
              Paste any URL and instantly get metadata, OG tags, and social previews for your projects.
            </p>
          </div>

          {/* Feature Tags */}
          <ul className="center flex-wrap gap-2">
            {libraries.map((library) => (
              <li
                key={library}
                className="text-xs md:text-sm text-muted bg-secondary border border-line rounded-full px-3 py-1"
              >
                {library}
              </li>
            ))}
          </ul>

          {/* CTA Button - Matches .btn-primary logic */}
          <a
            href="/generate"
            className="mt-4 px-8 py-3 rounded-full btn btn-primary hover:opacity-90 transition-all shadow-lg shadow-primary/10"
          >
            Start Generating
            <ArrowRight size={18} />
          </a>

        </div>
      </Pattern>
    </div>
  );
}
