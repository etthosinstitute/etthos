"use client";

import React, { useState } from "react";
import { Mail, ChevronRight, CreditCard, CheckCircle2 } from "lucide-react";
import { EnquiryModal } from "./EnquiryModal";

type CourseEnquiryProps = {
  courseSlug: string;
  courseTitle: string;
  whoShouldJoin?: string[];
  showBrochure?: boolean;
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

export const CourseEnquiry = ({ 
  courseSlug, 
  courseTitle, 
  whoShouldJoin,
  showBrochure = false
}: CourseEnquiryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("500");

  const handleRazorpayPreview = async () => {
    setPaymentMessage(null);
    setIsPaymentLoading(true);

    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      setPaymentMessage({ type: "error", text: "Please enter a valid amount." });
      setIsPaymentLoading(false);
      return;
    }

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
          amountInr: amount,
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

      const options = {
        key: result.keyId,
        amount: result.amount,
        currency: result.currency || "INR",
        order_id: result.orderId,
        name: "Etthos Institute",
        description: `${courseTitle} - Enrollment Token`,
        theme: {
          color: "#1F5F5B",
        },
        handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
          setIsPaymentLoading(true);
          try {
            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              setPaymentMessage({ type: "success", text: "Payment successful! Your enrollment token has been secured." });
            } else {
              const err = await verifyRes.json();
              throw new Error(err.message || "Payment verification failed.");
            }
          } catch (error) {
            setPaymentMessage({ type: "error", text: error instanceof Error ? error.message : "Verification failed." });
          } finally {
            setIsPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsPaymentLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentMessage({ type: "error", text: error instanceof Error ? error.message : "Razorpay preview is not enabled yet." });
      setIsPaymentLoading(false);
    }
  };

  return (
    <>
      <div className="sticky top-24 space-y-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 text-center" id="apply">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Start?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Secure your spot in the upcoming batch.</p>
          
          <div className="space-y-4">
            {razorpayPreviewEnabled && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <span className="text-sm font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">INR</span>
                </div>
              </div>
            )}

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
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard className="w-4 h-4" />
              {isPaymentLoading
                ? "Preparing Checkout..."
                : razorpayPreviewEnabled
                  ? `Pay ₹${customAmount || '0'} Now`
                  : "Razorpay Ready On Approval"}
            </button>

            {showBrochure && (
              <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Download Brochure
              </button>
            )}
          </div>

          {paymentMessage ? (
            <div className={`mt-6 p-4 rounded-2xl flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-300 ${
              paymentMessage.type === "success" 
                ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400" 
                : "bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-amber-800 dark:text-amber-400"
            }`}>
              {paymentMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <div className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center rounded-full bg-amber-200 text-amber-700 font-bold text-xs">!</div>
              )}
              <p className="text-xs font-medium leading-relaxed">
                {paymentMessage.text}
              </p>
            </div>
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
