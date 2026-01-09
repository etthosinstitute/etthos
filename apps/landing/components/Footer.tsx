import React from "react";
import { Logo } from "@repo/ui/logo";
import { Facebook, Linkedin, Instagram, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61577745823989",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/etthos-institute-of-behavioral-research-and-training/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/etthosinstitute/",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/+917261028965",
  },
];

export const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/70 bg-surface-card py-12 text-slate-500 transition-colors dark:border-white/10 dark:bg-gradient-to-b dark:from-brand-ink dark:to-brand-midnight dark:text-text-muted">
      
      {/* Background Large Text/Logo Effect */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 select-none opacity-[0.05] dark:opacity-[0.1]">
        <h1 className="text-[12rem] font-bold tracking-tighter md:text-[20rem]">
          ETTHOS
        </h1>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-10 md:text-left">
        <Logo width={160} height={40} className="w-auto" />
        
        {/* Social Links */}
        <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-rose-500 hover:text-white hover:scale-110 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-rose-500 dark:hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-text-muted dark:text-text-muted">
                © 2026 Etthos Institute. All rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
};