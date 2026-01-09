import React from "react";
import Link from "next/link";

// Force static generation for optimal Vercel deployment
export const dynamic = 'force-static';
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ServiceHero } from "../../components/ServiceHero";
import { ServiceCTA } from "../../components/ServiceCTA";
import { trainingCourses, TrainingCourseCategory } from "../../lib/training-courses";
import { ArrowRight, Clock, Sparkles, GraduationCap, Users, Briefcase } from "lucide-react";

const TrainingPage = () => {
  // Group courses by category
  const groupedCourses: Record<TrainingCourseCategory, typeof trainingCourses> = {
    "Internship": trainingCourses.filter(c => c.category === "Internship"),
    "Certification": trainingCourses.filter(c => c.category === "Certification"),
    "Diploma": trainingCourses.filter(c => c.category === "Diploma"),
    "Train The Trainer": trainingCourses.filter(c => c.category === "Train The Trainer"),
  };

  const categoryIcons = {
    "Internship": <span className="text-2xl">🎓</span>,
    "Certification": <span className="text-2xl">📜</span>,
    "Diploma": <span className="text-2xl">🏆</span>,
    "Train The Trainer": <span className="text-2xl">👥</span>,
  };

  const categoryDescriptions = {
    "Internship": "Gain hands-on experience under the mentorship of Licensed Clinical Psychologists.",
    "Certification": "Specialized short-term programs to master specific therapeutic and clinical skills.",
    "Diploma": "Comprehensive, long-term programs for deep professional competence.",
    "Train The Trainer": "Empower yourself to lead, mentor, and train others in corporate and soft skills paradigms."
  };

  return (
    <div className="bg-surface-base text-text-high font-display min-h-screen transition-colors">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />

        <main className="w-full">
          <ServiceHero
            title="Advance Your Career In"
            highlightedWord="Psychology"
            description="Explore our professionally curated training tracks designed to bridge the gap between academic theory and clinical practice."
            badge="Globally Recognized"
            badgeIcon={<GraduationCap className="w-4 h-4" />}
            backLink="/"
            backText="Back to Home"
          />

          {/* Course Categories */}
          <section className="relative bg-surface-base py-20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-surface-card via-surface-soft to-surface-base dark:from-brand-ink dark:via-brand-ink/40 dark:to-brand-midnight" aria-hidden />
            
            <div className="relative container mx-auto px-4 md:px-6 space-y-20">
              {Object.entries(groupedCourses).map(([category, courses]) => (
                courses.length > 0 && (
                  <div key={category} className="scroll-mt-24" id={category.toLowerCase().replace(/\s+/g, '-')}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-surface-base border-4 border-surface-soft dark:border-brand-ink flex items-center justify-center shadow-lg">
                        {categoryIcons[category as TrainingCourseCategory]}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-text-high">{category}s</h2>
                        <p className="text-sm text-text-muted mt-1">
                          {categoryDescriptions[category as TrainingCourseCategory]}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                      {courses.map((course) => (
                        <Link 
                          key={course.slug} 
                          href={`/training/${course.slug}`}
                          className="group relative bg-surface-card rounded-2xl border border-slate-200/60 dark:border-white/10 p-6 hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                        >
                          <div className="mb-4">
                            <div className="inline-block px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-4">
                              {course.category}
                            </div>
                            <h3 className="text-xl font-bold text-text-high group-hover:text-brand-cyan transition-colors mb-2">
                              {course.title}
                            </h3>
                            <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
                              {course.shortDescription}
                            </p>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                            {course.durationOptions && (
                              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                                <Clock className="w-3.5 h-3.5" />
                                {course.durationOptions[0]}
                              </div>
                            )}
                            
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-2 transition-all">
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

          <ServiceCTA
            title="Still Unsure Which Path to Take?"
            description="Our academic counsellors can help you choose the right certification based on your career goals and current qualification."
            primaryButtonText="Get Free Guidance"
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TrainingPage;
