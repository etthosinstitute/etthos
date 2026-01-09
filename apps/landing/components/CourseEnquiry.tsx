"use client";

import React, { useState } from "react";
import { Mail, ChevronRight } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

type CourseEnquiryProps = {
  courseTitle: string;
  whoShouldJoin?: string[];
};

export const CourseEnquiry = ({ courseTitle, whoShouldJoin }: CourseEnquiryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="sticky top-24 space-y-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 text-center" id="apply">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Start?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Secure your spot in the upcoming batch.</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 dark:bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-lg shadow-slate-900/20 dark:shadow-black/30"
            >
              <Mail className="w-4 h-4" />
              Enquiry
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Download Brochure
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            Limited seats available per batch for personalized attention.
          </div>
        </div>

        {whoShouldJoin && (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Who Should Join
            </h4>
            <ul className="space-y-3">
              {whoShouldJoin.map((person, i) => (
                <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  {person}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={courseTitle} 
      />
    </>
  );
};
