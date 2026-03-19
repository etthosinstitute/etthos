import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Shield, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-foreground/90 text-sm font-medium mb-8 animate-fade-in-up backdrop-blur-sm border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
          </span>
          Now Accepting Submissions — Volume 1, Issue 1
        </div>
        
        <h1 className="font-serif font-bold text-4xl md:text-6xl mb-6 tracking-tight leading-tight max-w-4xl mx-auto animate-fade-in-up delay-100">
          Etthos Journal of{" "}
          <span className="text-highlight">Psychology</span>
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          A peer-reviewed, open-access journal publishing original research and reviews in{" "}
          <strong>psychology and behavioural sciences</strong>. Published by Etthos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Button asChild size="lg" className="h-12 px-8 text-base bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link href="/submit">
              Submit Your Manuscript
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10">
            <Link href="/issues">
              Browse Issues
            </Link>
          </Button>
        </div>

        {/* Compliant stats — NO misleading claims */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto pt-12 border-t border-primary-foreground/20">
          <div className="text-center">
            <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-5 w-5 text-highlight" />
            </div>
            <div className="font-serif font-bold text-xl mb-1">Open Access</div>
            <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">Publication Model</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Shield className="h-5 w-5 text-highlight" />
            </div>
            <div className="font-serif font-bold text-xl mb-1">Peer-Reviewed</div>
            <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">Double-Blind</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Globe className="h-5 w-5 text-highlight" />
            </div>
            <div className="font-serif font-bold text-xl mb-1">Psychology</div>
            <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">& Behavioural Sciences</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-5 w-5 text-highlight" />
            </div>
            <div className="font-serif font-bold text-xl mb-1">Quarterly</div>
            <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">Publication Frequency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
