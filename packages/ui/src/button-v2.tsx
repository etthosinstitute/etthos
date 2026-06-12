import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className = "", ...props },
    ref,
  ) => {
    const baseStyles =
      "font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan/60";

    const variants = {
      primary:
        "bg-gradient-to-r from-brand-cobalt via-brand-iris to-brand-cyan text-text-high shadow-glow hover:brightness-110",
      secondary:
        "bg-surface-card/70 text-text-high border border-white/10 hover:border-brand-cyan/50 hover:bg-surface-card",
      outline:
        "bg-transparent border border-border-glow text-text-high hover:bg-white/5",
      ghost:
        "bg-white/5 border border-white/10 text-text-high hover:bg-white/10",
    };

    const sizes = {
      sm: "py-2.5 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-3.5 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
