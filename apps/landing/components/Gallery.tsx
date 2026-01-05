import React from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.12.58.jpeg",
    alt: "Campus life moment",
    className: "row-span-2 col-span-2",
  },
  {
    src: "/gallery/THatimage.jpeg",
    alt: "Students interaction",
    className: "row-span-1 col-span-1",
  },
  {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.13.00 (1).jpeg",
    alt: "Learning session",
    className: "row-span-1 col-span-1",
  },
  {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.13.00.jpeg",
    alt: "Group activity",
    className: "row-span-1 col-span-2",
  },
  {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.13.07 (1).jpeg",
    alt: "Student portrait",
    className: "row-span-1 col-span-1",
  },
  {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.13.07.jpeg",
    alt: "Classroom setting",
    className: "row-span-1 col-span-1",
  },
  {
    src: "/gallery/that1.jpeg",
    alt: "Discussion group",
    className: "row-span-2 col-span-2",
  },
   {
    src: "/gallery/WhatsApp Image 2025-12-25 at 00.13.10 (1).jpeg",
    alt: "Campus event",
    className: "row-span-1 col-span-1",
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
            Join a vibrant community of future psychologists. Experience immersive learning
            in our state-of-the-art facilities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px] md:h-[600px] auto-rows-[minmax(0,_1fr)]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
