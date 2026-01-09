import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { trainingCourses } from "../../../lib/training-courses";
import { 
  ArrowLeft, 
  Clock, 
  Monitor, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  ChevronRight,
  MessageCircle,
  Mail,
  Users
} from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return trainingCourses.map((course) => ({
    slug: course.slug,
  }));
}

const TrainingCoursePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const course = trainingCourses.find((c) => c.slug === slug);
  if (!course) return notFound();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-display min-h-screen selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <Header />

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0B1120]">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <Link
              href="/training"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Training
            </Link>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {course.category}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                {course.title}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl border-l-2 border-indigo-500/30 pl-6">
                {course.shortDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                 <a href="#apply" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40">
                   Apply Now
                 </a>
                 <a href="#curriculum" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                   View Curriculum
                 </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-16 -mt-10 relative z-20">
            {/* Stats Grid (Bento Box Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider mb-1">Duration</h3>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{course.durationOptions?.join(" or ")}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                        <Monitor className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider mb-1">Format</h3>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">Live Online & Interactive</p>
                    </div>
                </div>

                 <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex flex-col items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wider mb-1">Certification</h3>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">Professional Certificate</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
                {/* Main Content */}
                <div className="space-y-16">
                    
                    {course.overview && (
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                                Program Overview
                            </h2>
                            <div className="prose prose-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                <p>{course.overview}</p>
                            </div>
                        </section>
                    )}

                    {course.keyModules && (
                        <section id="curriculum">
                             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                                What You Will Learn
                            </h2>
                            <div className="grid gap-4">
                                {course.keyModules.map((module, i) => (
                                    <div key={i} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all">
                                        <div className="flex gap-4 items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold border border-indigo-100 dark:border-indigo-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white">{module}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {course.benefits && (
                         <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                                Why Join This Program?
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {course.benefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 flex-shrink-0 text-emerald-500 dark:text-emerald-400">
                                            <CheckCircle2 className="w-5 h-5 fill-emerald-50 dark:fill-emerald-900/20" />
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                     {course.faqs && (
                        <section>
                             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                                Common Questions
                            </h2>
                            <div className="space-y-4">
                                {course.faqs.map((faq, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-start gap-3">
                                            <HelpCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                            {faq.question}
                                        </h3>
                                        <p className="mt-3 text-slate-600 dark:text-slate-400 pl-8 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8 lg:sticky lg:top-28">
                    {/* Ready to Start Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl shadow-indigo-500/20">
                      <h3 className="text-xl font-bold mb-2">Ready to Start?</h3>
                      <p className="text-indigo-100 text-sm mb-6">Get in touch to enroll in {course.title}</p>
                      
                      <a
                        href="https://wa.me/+917261028965"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors mb-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp Us
                      </a>
                      <a
                        href="mailto:info@etthos.com"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm"
                      >
                        <Mail className="w-5 h-5" />
                        Email Us
                      </a>
                    </div>

                    {/* Who Should Join */}
                    {course.whoShouldJoin && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-500" />
                          Who Should Join
                        </h3>
                        <ul className="space-y-3">
                          {course.whoShouldJoin.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default TrainingCoursePage;
