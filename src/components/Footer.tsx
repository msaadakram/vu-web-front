"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  ChevronRight,
  ArrowUp,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = {
    Academics: [
      { label: "Blog Articles", href: "/blog" },
      { label: "News & Updates", href: "/news" },
      { label: "Study Resources", href: "/resources" },
      { label: "Academic Programs", href: "/programs" },
    ],
    University: [
      { label: "About Us", href: "/about" },
      { label: "Fee Structure", href: "/fee-structure" },
      { label: "Grading Policy", href: "/grading" },
      { label: "Sitemap", href: "/sitemap" },
      { label: "Upload Resource", href: "/upload" },
    ],
    Resources: [
      { label: "Browse All", href: "/resources" },
      { label: "Assignments", href: "/resources?type=assignment" },
      { label: "Handouts", href: "/resources?type=handout" },
      { label: "Lecture Notes", href: "/resources?type=notes" },
    ],
  };

  const socials = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Youtube, label: "YouTube" },
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Instagram, label: "Instagram" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Please enter your email");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setEmail("");
        toast.success(data.message || "Subscribed! We'll keep you updated.");
      } else if (res.status === 409) {
        toast.info(data.message || "This email is already subscribed.");
      } else {
        toast.error(data.message || "Subscription failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#0f1e35] text-white relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

      {/* Newsletter Bar */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h3
                className="text-white mb-1.5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.15rem, 3vw, 1.35rem)",
                  fontWeight: 600,
                }}
              >
                Stay Updated with VirtualU
              </h3>
              <p className="text-white/50 text-sm">
                Get the latest blogs and resources delivered to your inbox.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your university email"
                aria-label="Email address"
                disabled={subscribing}
                className="flex-1 lg:w-72 w-full px-5 py-3 bg-white/8 border border-white/15 rounded-full text-white placeholder:text-white/35 outline-none focus:border-[#4eafc4] focus:bg-white/12 transition-all text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-6 py-3 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#4eafc4]/25 transition-all whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {subscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4eafc4] to-[#2a4a73] flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <span
                  className="block text-white font-bold"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                  }}
                >
                  VirtualU
                </span>
                <span className="block text-[#4eafc4] text-[11px] font-medium tracking-[0.15em] uppercase">
                  University
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-xs">
              Empowering students across Pakistan with quality education,
              comprehensive study materials, and AI-assisted study guides.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Mail, text: "support@virtualu.edu.pk" },
                { icon: Phone, text: "+92 51 111 880 880" },
                { icon: MapPin, text: "Islamabad, Pakistan" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-white/50 text-sm"
                >
                  <Icon className="w-4 h-4 text-[#4eafc4] shrink-0" />
                  <span className="break-all">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white/90 font-semibold mb-4 sm:mb-5 text-xs tracking-[0.12em] uppercase">
                {category}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-white/45 hover:text-[#4eafc4] text-sm transition-colors duration-200"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-white/35 text-xs">
            © {currentYear} VirtualU. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {socials.map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                onClick={() => toast.info(`Follow us on ${label} — link coming soon`)}
                className="w-9 h-9 rounded-full bg-white/6 hover:bg-[#4eafc4] flex items-center justify-center transition-all duration-200 group cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-white/45 group-hover:text-white transition-colors" />
              </button>
            ))}
          </div>
          <div className="flex gap-5 text-xs text-white/35">
            <Link href="/about" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">Contact</Link>
            <Link href="/sitemap" className="hover:text-white/70 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#3a95aa] text-white shadow-lg flex items-center justify-center hover:shadow-[#4eafc4]/30 hover:scale-105 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
