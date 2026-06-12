import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  trainingCourses,
  TrainingCourseCategory,
} from "../../lib/training-courses";
import {
  ArrowRight,
  Clock,
  Sparkles,
  GraduationCap,
  Users,
  Briefcase,
} from "lucide-react";

const TrainingPage = () => {
  // Group courses by category
  const groupedCourses: Record<TrainingCourseCategory, typeof trainingCourses> =
    {
      Internship: trainingCourses.filter((c) => c.category === "Internship"),
      Certification: trainingCourses.filter(
        (c) => c.category === "Certification",
      ),
      Diploma: trainingCourses.filter((c) => c.category === "Diploma"),
      "Train The Trainer": trainingCourses.filter(
        (c) => c.category === "Train The Trainer",
      ),
    };

  const categoryIcons = {
    Internship: <Briefcase className="w-5 h-5" />,
    Certification: <Sparkles className="w-5 h-5" />,
    Diploma: <GraduationCap className="w-5 h-5" />,
    "Train The Trainer": <Users className="w-5 h-5" />,
  };

  const categoryDescriptions = {
    Internship:
      "Gain hands-on experience under the mentorship of Licensed Clinical Psychologists.",
    Certification:
      "Specialized short-term programs to master specific therapeutic and clinical skills.",
    Diploma:
      "Comprehensive, long-term programs for deep professional competence.",
    "Train The Trainer":
      "Empower yourself to lead, mentor, and train others in corporate and soft skills paradigms.",
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-display min-h-screen selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />

        <main className="w-full">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0B1120]">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Advance Your Career
                <br /> <span className="text-indigo-400">In Psychology</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Explore our professionally curated training tracks designed to
                bridge the gap between academic theory and clinical practice.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 md:px-6 py-20 space-y-24 -mt-10 relative z-10">
            {Object.entries(groupedCourses).map(
              ([category, courses]) =>
                courses.length > 0 && (
                  <section
                    key={category}
                    className="scroll-mt-24"
                    id={category.toLowerCase().replace(/\s+/g, "-")}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 text-indigo-600 dark:text-indigo-400">
                        {categoryIcons[category as TrainingCourseCategory]}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        {category}s
                      </h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-3xl pl-[60px]">
                      {categoryDescriptions[category as TrainingCourseCategory]}
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {courses.map((course) => (
                        <div
                          key={course.slug}
                          className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full"
                        >
                          <div className="mb-4">
                            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                              {course.category}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                              {course.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                              {course.shortDescription}
                            </p>
                          </div>

                          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            {course.durationOptions && (
                              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                {course.durationOptions[0]}
                              </div>
                            )}

                            <Link
                              href={`/training/${course.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ),
            )}
          </div>

          <section className="py-20 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Still Unsure Which Path to Take?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Our academic counsellors can help you choose the right
                certification based on your career goals and current
                qualification.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:info@etthos.com"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Get Free Guidance
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default TrainingPage;
