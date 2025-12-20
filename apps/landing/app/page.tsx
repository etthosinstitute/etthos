import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { Programs } from "../components/Programs";
import { Footer } from "../components/Footer";

const Page = () => {
  return (
    <div className="bg-surface-base text-text-high font-display overflow-x-hidden antialiased selection:bg-brand-cyan selection:text-brand-midnight transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main>
          <Hero />
          <Partners />
          <Programs />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
