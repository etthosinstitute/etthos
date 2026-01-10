"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const team = [
  {
    name: "Ram Vinoy Tiwari",
    role: "Director & Chairman",
    image: "/aboutusimages/ram-vinay-tiwari.jpeg",
  },
  {
    name: "Vishal Anand",
    role: "Director & CEO",
    image: "/aboutusimages/vishal-anand.jpeg",
    objectPosition: "top",
  },
  {
    name: "Abhimanyu Thakur",
    role: "Senior Counselor",
    image: "/aboutusimages/abhimanyu-thakur.jpeg",
  },
  {
    name: "Kumari Pushpa",
    role: "Head Of Operations",
    image: "/aboutusimages/kumari-pushpa.jpeg",
  },
  {
    name: "Pritha Bose",
    role: "Head of Graphics & Content",
    image: "/aboutusimages/pritha-bose.jpg",
  },
  {
    name: "Samarth",
    role: "HR Head",
    image: "/aboutusimages/smarth.jpeg",
  },
  {
    name: "Pawan Kumar",
    role: "Finance Head",
    image: "/aboutusimages/pawan-kumar.jpeg",
  },
];

const certificates = [
  {
    src: "/aboutusimages/START-UP-INDIA (1).png",
    alt: "Startup India",
    label: "Recognized by Startup India",
  },
  {
    src: "/aboutusimages/Screenshot-2025-07-18-225624 (1).png",
    alt: "ISO Certificate",
    label: "ISO 9001:2015 Certified",
  },
];

const AboutPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="bg-surface-base text-text-high font-display overflow-x-hidden antialiased transition-colors">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-brand-midnight text-white">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 right-0 w-150 h-150 bg-brand-cyan/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-iris/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Shaping the Future of <span className="text-brand-cyan">Psychology</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
              Etthos Institute of Behavioral Research and Training Pvt. Ltd. is a distinguished organization committed to excellence in the field of behavioral sciences.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-surface-base border-b border-slate-200/50 dark:border-white/5">
          <div className="mx-auto max-w-[1440px] px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Mission & Vision</h2>
                <div className="space-y-4 text-text-muted leading-relaxed">
                  <p>
                    Established with a vision to elevate the standards of psychological education and application, Etthos offers structured and practice-oriented training programs for emerging psychologists. Our training modules are designed to bridge the gap between theoretical frameworks and clinical realities.
                  </p>
                  <p>
                    <strong className="text-text-high">Vision:</strong> To be a pioneering institution in behavioral research and applied psychology, empowering individuals, organizations, and communities through transformative training, scientific inquiry, and impactful psychological services.
                  </p>
                  <p>
                    <strong className="text-text-high">Mission:</strong> To promote the practical application of psychology through comprehensive education, advanced training, community engagement, and research; and to uphold the highest standards of ethical practice and professional excellence.
                  </p>
                </div>
                
                {/* Certificates - Clickable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {certificates.map((cert, index) => (
                    <button
                      key={index}
                      onClick={() => setLightboxImage(cert.src)}
                      className="bg-white dark:bg-surface-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer text-left"
                    >
                      <Image 
                        src={cert.src} 
                        alt={cert.alt} 
                        width={200} 
                        height={80} 
                        className="h-16 w-auto object-contain mb-3 mx-auto dark:brightness-110"
                      />
                      <p className="text-sm font-semibold text-center text-slate-700 dark:text-slate-200">{cert.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
                <Image 
                  src="/gallery/WhatsApp Image 2025-12-25 at 00.12.59.jpeg" 
                  alt="Etthos Institute" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-surface-soft dark:bg-brand-ink/20">
          <div className="mx-auto max-w-[1440px] px-4 md:px-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-text-high">Meet Our Leadership</h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                A dedicated team of professionals driving innovation in psychological research and training.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {team.map((member, index) => (
                <div key={index} className="group flex flex-col items-center">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-[2rem] overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 border-2 border-transparent group-hover:border-brand-cyan/50">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className={`object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${member.objectPosition === 'top' ? 'object-top' : 'object-center'}`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-brand-cyan font-semibold text-xs md:text-sm uppercase tracking-wider mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white text-4xl font-light hover:text-brand-cyan transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Image
              src={lightboxImage}
              alt="Certificate"
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
