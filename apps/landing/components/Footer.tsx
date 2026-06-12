import Link from "next/link";
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
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/50 bg-white py-12 text-slate-600 transition-colors dark:border-white/5 dark:bg-brand-midnight dark:text-slate-300">
      {/* Background Large Text/Logo Effect */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 select-none opacity-[0.03] dark:opacity-[0.08]">
        <h1 className="text-[12rem] font-bold tracking-tighter md:text-[20rem]">
          ETTHOS
        </h1>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:text-left">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Logo width={160} height={40} className="w-auto" />
            <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
              Advancing psychology through research, training, and
              evidence-based practice.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 text-center md:text-left">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Company
              </h4>
              <Link
                href="/about"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                Services
              </Link>
              <a
                href="https://wa.me/+917261028965"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Legal
              </h4>
              <Link
                href="/privacy-policy"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors"
              >
                Refund Policy
              </Link>
            </div>
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Connect
              </h4>
              <div className="flex justify-center md:justify-start gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-brand-cyan hover:text-white dark:bg-white/10 dark:text-slate-300 dark:hover:bg-brand-cyan dark:hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Etthos Institute. All rights reserved.</p>
          <p>Managed Human Behaviour.</p>
        </div>
      </div>
    </footer>
  );
};
