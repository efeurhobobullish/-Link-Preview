import ModeToggle from "@/components/ui/mode-toggle";
import { Pattern } from "@/components/ui";
import { libraries } from "@/constants/data";
import { Github, ArrowRight, Sparkles, Link2, Zap, Check, Globe, Image as ImageIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-background">
      {/* Background Pattern with Overlay */}
      <Pattern />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-primary/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Mode Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 layout">
        
        {/* GitHub Link */}
        <div className="absolute top-20">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 border border-line rounded-full bg-secondary/80 backdrop-blur-sm px-4 py-2 hover:border-primary/40 hover:bg-secondary transition-all duration-300"
          >
            <Github size={16} className="text-main group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-main group-hover:text-primary transition-colors">
              Star on GitHub
            </span>
            <ArrowRight size={14} className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Hero Content */}
        <div className="text-center space-y-8">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-line backdrop-blur-sm">
            <Sparkles size={14} className="text-primary" />
            <span className="text-sm font-medium text-main">Instant & Free</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-main/60">
                Universal Link
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Preview Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Paste any URL and instantly generate beautiful social media previews, 
              extract metadata, and analyze Open Graph tags.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto py-4">
            {[
              { icon: Globe, text: "Any Website" },
              { icon: ImageIcon, text: "Instant Previews" },
              { icon: Check, text: "No Sign-up" },
            ].map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 border border-line backdrop-blur-sm"
              >
                <feature.icon size={18} className="text-primary" />
                <span className="text-sm font-medium text-main">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Technology Tags */}
          <div className="pt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {libraries.map((library) => (
                <span
                  key={library}
                  className="px-3 py-1.5 text-sm text-muted bg-secondary border border-line rounded-full hover:border-primary/30 hover:text-main transition-all duration-300"
                >
                  {library}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8 space-y-4">
            <a
              href="/generate"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full btn btn-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              <span>Start Generating</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-muted">
              Free forever • No credit card required
            </p>
          </div>

          {/* Preview Example */}
          <div className="pt-12 max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-xl bg-secondary border border-line backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Link2 size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 w-24 bg-line rounded-full mb-2" />
                    <div className="h-2 w-16 bg-line/50 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 bg-line rounded-full" />
                  <div className="h-2.5 bg-line rounded-full w-5/6" />
                  <div className="h-2.5 bg-line rounded-full w-4/6" />
                </div>
                <div className="mt-4 pt-4 border-t border-line">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-primary" />
                    <span className="text-xs text-muted">Preview generating in real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="layout">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
              <div className="flex items-center gap-6">
                <span>⚡ Instant results</span>
                <span>🔒 Privacy focused</span>
                <span>🎯 100% accurate</span>
              </div>
              <div>
                <span className="text-xs">Open Source • MIT Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) scale(1.2); 
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}