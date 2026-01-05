import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { WhoWeAre } from "../components/WhoWeAre";
import { Gallery } from "../components/Gallery";
import { Programs } from "../components/Programs";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { Partners } from "../components/Partners";
import { Footer } from "../components/Footer";

const Page = () => {
  return (
    <div className="bg-surface-base text-text-high font-display overflow-x-hidden antialiased selection:bg-brand-cyan selection:text-brand-midnight transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
         <main>
          <Hero />

          <WhoWeAre />
          
          <Gallery />

          <Programs />

          <Partners />

          <HowItWorks />

          <Testimonials />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Page;
