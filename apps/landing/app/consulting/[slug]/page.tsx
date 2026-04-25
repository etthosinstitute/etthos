import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { CourseEnquiry } from "../../../components/CourseEnquiry";
import { consultingServices } from "../../../lib/consulting-services";
import { 
  ArrowLeft, 
  Monitor, 
  CheckCircle2, 
  HelpCircle,
  Briefcase,
  MessageCircle,
  Mail
} from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return consultingServices.map((service) => ({
    slug: service.slug,
  }));
}

const ConsultingServicePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const service = consultingServices.find((s) => s.slug === slug);
  if (!service) return notFound();

  return (
    <div className="bg-surface-base text-text-high font-display min-h-screen transition-colors">
      <Header />

      <main>
        {/* Hero Section - matching landing page */}
        <section className="relative bg-surface-base py-20 lg:py-28 transition-colors overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-200 h-200 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-150 h-150 bg-brand-iris/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <Link
              href="/consulting"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-cyan transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Consulting
            </Link>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-sm font-medium mb-6">
                <Briefcase className="w-4 h-4" />
                Consulting Service
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-high mb-6">
                {service.title}
              </h1>
              
              <p className="text-lg text-text-muted leading-relaxed max-w-3xl">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-16">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-surface-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-text-muted font-medium text-sm uppercase tracking-wider mb-1">Consulting</h3>
                <p className="text-lg font-bold text-text-high">Behavioral Science</p>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-brand-iris/10 text-brand-iris rounded-xl">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-text-muted font-medium text-sm uppercase tracking-wider mb-1">Format</h3>
                <p className="text-lg font-bold text-text-high">{service.deliveryMode || "Customized"}</p>
              </div>
            </div>

            <div className="bg-surface-card p-6 rounded-2xl border border-slate-200/60 dark:border-white/10 flex flex-col items-start gap-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-brand-cobalt/10 text-brand-cobalt rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-text-muted font-medium text-sm uppercase tracking-wider mb-1">Approach</h3>
                <p className="text-lg font-bold text-text-high">Data-Driven</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="space-y-16">
              
              {service.overview && (
                <section>
                  <h2 className="text-2xl font-bold text-text-high mb-6">
                    Overview
                  </h2>
                  <div className="prose prose-lg text-text-muted leading-relaxed">
                    <p>{service.overview}</p>
                  </div>
                </section>
              )}

              {service.services && (
                <section id="services">
                  <h2 className="text-2xl font-bold text-text-high mb-8">
                    Services Include
                  </h2>
                  <div className="grid gap-4">
                    {service.services.map((item, i) => (
                      <div key={i} className="group relative bg-surface-card border border-slate-200/60 dark:border-white/10 p-5 rounded-xl hover:border-brand-cyan/50 hover:shadow-md transition-all">
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-brand-cyan/10 text-brand-cyan flex items-center justify-center text-xs font-bold border border-brand-cyan/20">
                              {i + 1}
                            </div>
                          </div>
                          <p className="text-text-muted font-medium">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {service.idealFor && (
                <section>
                  <h2 className="text-2xl font-bold text-text-high mb-8">
                    Ideal For
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.idealFor.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="mt-1 flex-shrink-0 text-brand-cyan">
                          <CheckCircle2 className="w-5 h-5 fill-brand-cyan/10" />
                        </div>
                        <p className="text-text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {service.faqs && (
                <section>
                  <h2 className="text-2xl font-bold text-text-high mb-8">
                    Common Questions
                  </h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="bg-surface-card border border-slate-200/60 dark:border-white/10 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                        <h3 className="font-semibold text-text-high flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h3>
                        <p className="mt-3 text-text-muted pl-8 leading-relaxed">
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
              <CourseEnquiry
                courseSlug={service.slug}
                courseTitle={service.title}
                whoShouldJoin={service.idealFor}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultingServicePage;
