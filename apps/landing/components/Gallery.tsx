import React from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "/gallery/WhatsApp Image 2026-01-15 at 21.36.40 (3).jpeg",
    alt: "Campus life moment",
    mobileClassName: "col-span-2 aspect-video",
    desktopClassName: "md:row-span-2 md:col-span-2",
    objectPosition: "center 30%",
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: true,
  },
  {
    src: "/gallery/1.jpg",
    alt: "Students interaction",
    mobileClassName: "col-span-1 aspect-[3/4]",
    desktopClassName: "md:row-span-2 md:col-span-1",
    objectPosition: "top",
    sizes: "(max-width: 768px) 50vw, 25vw",
    priority: true,
  },
  {
    src: "/gallery/16.jpg",
    alt: "Learning session",
    mobileClassName: "col-span-1 aspect-[3/4]",
    desktopClassName: "md:row-span-2 md:col-span-1",
    objectPosition: "top",
    sizes: "(max-width: 768px) 50vw, 25vw",
    priority: true,
  },
  {
    src: "/gallery/19.jpg",
    alt: "Group activity",
    mobileClassName: "col-span-2 aspect-video",
    desktopClassName: "md:row-span-3 md:col-span-2",
    objectPosition: "center",
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: false,
  },
  {
    src: "/gallery/6.jpg",
    alt: "Student portrait",
    mobileClassName: "col-span-1 aspect-square",
    desktopClassName: "md:row-span-2 md:col-span-1",
    objectPosition: "center",
    sizes: "(max-width: 768px) 50vw, 25vw",
    priority: false,
  },
  {
    src: "/gallery/31.jpg",
    alt: "Classroom setting",
    mobileClassName: "col-span-1 aspect-square row-span-2 bg-surface-elevated",
    desktopClassName: "md:row-span-2 md:col-span-2",
    objectPosition: "center",
    objectFit: "contain",
    sizes: "(max-width: 768px) 50vw, 50vw",
    priority: false,
  },
  {
    src: "/gallery/14.jpg",
    alt: "Discussion group",
    mobileClassName: "col-span-2 aspect-video",
    desktopClassName: "md:row-span-3 md:col-span-2",
    objectPosition: "top",
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: false,
  },
  {
    src: "/gallery/32.jpg",
    alt: "Campus event",
    mobileClassName: "col-span-2 aspect-video",
    desktopClassName: "md:row-span-2 md:col-span-2",
    objectPosition: "top",
    sizes: "(max-width: 768px) 100vw, 50vw",
    priority: false,
  },
];

export const Gallery = () => {
  return (
    <section className="py-24 bg-surface-base">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-brand-cyan font-bold">
            Our Facilities
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-high mb-6">
            Life at Etthos
          </h2>
          <p className="text-lg text-text-muted">
            Join a vibrant community of future psychologists. Experience
            immersive learning in our state-of-the-art facilities.
          </p>
        </div>

        {/* Mobile: Simple grid layout with aspect ratios */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group ${image.mobileClassName}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                quality={80}
                priority={image.priority}
                style={{ objectPosition: image.objectPosition }}
                className={`${image.objectFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* Desktop: Complex grid layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 h-[800px] auto-rows-[minmax(0,_1fr)]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group ${image.desktopClassName}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                quality={80}
                priority={image.priority}
                style={{ objectPosition: image.objectPosition }}
                className={`${image.objectFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
