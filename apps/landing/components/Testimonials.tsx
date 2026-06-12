import React from "react";

const testimonials = [
  {
    name: "Anjana R",
    role: "Psychology Student",
    content:
      "The training I received at Etthos completely changed how I look at psychology. It’s not just about theory, they really help you understand how to apply it in real life. I feel much more confident stepping into the field now.",
    color: "bg-blue-500",
  },
  {
    name: "Vivek K",
    role: "Therapy Client",
    content:
      "I was nervous about starting therapy, but the team at Etthos made me feel safe and understood from day one. My therapist helped me see things with clarity, and it has made a big difference in how I manage my emotions.",
    color: "bg-green-500",
  },
  {
    name: "Rahul M",
    role: "Corporate Partner",
    content:
      "Our organization partnered with Etthos for employee wellness programs, and the change has been phenomenal. Their sessions were engaging, informative, and deeply relevant to the challenges our team faces.",
    color: "bg-purple-500",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-surface-base overflow-hidden">
      <div className="max-w-360 mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-brand-iris font-bold">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-text-high">
              Stories of Growth
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-surface-soft dark:bg-surface-card border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 hover:shadow-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-text-high">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-text-muted uppercase tracking-wide">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
