"use client";

import React, { useState } from "react";
import { Mail, ChevronRight, CreditCard } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

type CourseEnquiryProps = {
  courseSlug: string;
  courseTitle: string;
  whoShouldJoin?: string[];
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const razorpayPreviewEnabled = process.env.NEXT_PUBLIC_ENABLE_RAZORPAY_PREVIEW === "true";

async function loadRazorpayScript() {
  if (window.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const CourseEnquiry = ({ courseSlug, courseTitle, whoShouldJoin }: CourseEnquiryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const handleRazorpayPreview = async () => {
    setPaymentMessage(null);
    setIsPaymentLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout right now.");
      }

      const response = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug,
          courseTitle,
          amountInr: 500,
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        amount?: number;
        keyId?: string;
        orderId?: string;
        currency?: string;
      };

      if (!response.ok || !result.orderId || !result.keyId || !result.amount) {
        throw new Error(result.message || "Razorpay preview is not enabled yet.");
      }

      const razorpay = new window.Razorpay({
        key: result.keyId,
        amount: result.amount,
        currency: result.currency || "INR",
        order_id: result.orderId,
        name: "Etthos Institute",
        description: `${courseTitle} - preview token`,
        theme: {
          color: "#1F5F5B",
        },
      });

      razorpay.open();
    } catch (error) {
      setPaymentMessage(error instanceof Error ? error.message : "Razorpay preview is not enabled yet.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <>
      <div className="sticky top-24 space-y-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 text-center" id="apply">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Start?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Secure your spot in the upcoming batch.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
            Current fee is shared by admissions. Razorpay preview is scaffolded with a dummy Rs 500 token.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 dark:bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-lg shadow-slate-900/20 dark:shadow-black/30"
            >
              <Mail className="w-4 h-4" />
              Enquire Now
            </button>

            <button
              type="button"
              onClick={handleRazorpayPreview}
              disabled={!razorpayPreviewEnabled || isPaymentLoading}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard className="w-4 h-4" />
              {isPaymentLoading
                ? "Preparing Checkout..."
                : razorpayPreviewEnabled
                  ? "Pay Rs 500 Preview"
                  : "Razorpay Ready On Approval"}
            </button>

            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Download Brochure
            </button>
          </div>

          {paymentMessage ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs text-amber-700">
              {paymentMessage}
            </p>
          ) : null}

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
