import { Shield, Globe, Clock, BookOpen, Brain, Heart } from "lucide-react";

export function JournalFeatures() {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-bold text-3xl text-primary mb-3">
            Why Publish With Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The Etthos Journal of Psychology is committed to rigorous scholarship and ethical publishing in the behavioural sciences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center group">
             <div className="bg-secondary/10 p-4 rounded-full mb-6 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <Brain className="h-8 w-8" />
             </div>
             <h3 className="font-serif font-bold text-xl mb-3">Psychology Focused</h3>
             <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Dedicated exclusively to psychology and behavioural sciences — from clinical and cognitive to developmental and social psychology.
             </p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="bg-secondary/10 p-4 rounded-full mb-6 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <Shield className="h-8 w-8" />
             </div>
             <h3 className="font-serif font-bold text-xl mb-3">Rigorous Peer Review</h3>
             <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Every manuscript undergoes double-blind peer review by experts, ensuring the highest standards of scholarly integrity.
             </p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="bg-secondary/10 p-4 rounded-full mb-6 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                <Globe className="h-8 w-8" />
             </div>
             <h3 className="font-serif font-bold text-xl mb-3">Open Access</h3>
             <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                All articles are freely available under CC BY 4.0 licence, maximising reach and impact across the global research community.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
