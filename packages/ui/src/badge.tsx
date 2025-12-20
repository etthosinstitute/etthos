import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
}

export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
  const variants = {
    default: "bg-white/5 border-white/10 text-text-high",
    success: "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan",
    warning: "bg-brand-amber/20 border-brand-amber/20 text-brand-amber",
  };

  return (
    <span
      className={`px-3 py-1 border rounded-full font-semibold tracking-wide uppercase text-[0.65rem] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
