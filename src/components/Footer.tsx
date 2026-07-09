"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Academics: [
      { label: "Blog Articles", href: "/blog" },
      { label: "Study Guides", href: "/resources" },
      { label: "Lecture Notes", href: "/resources?type=notes" },
      { label: "Assignments", href: "/resources?type=assignment" },
    ],
    University: [
      { label: "About Us", href: "/about" },
      { label: "Faculty", href: "#" },
      { label: "Departments", href: "#" },
      { label: "Admissions", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Resources: [
      { label: "Library", href: "#" },
      { label: "E-Learning", href: "#" },
      { label: "Student Portal", href: "#" },
      { label: "Course Catalog", href: "#" },
      { label: "Scholarships", href: "#" },
    ],
  };

  const socials = [
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Twitter, label: "Twitter", href: "#" },
    { Icon: Youtube, label: "YouTube", href: "#" },
    { Icon: Linkedin, label: "LinkedIn", href: "#" },
    { Icon: Instagram, label: "Instagram", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f1e35] text-white relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />

      {/* Newsletter Bar */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h3
                className="text-white mb-1.5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                }}
              >
                Stay Updated with VirtualU
              </h3>
              <p className="text-white/50 text-sm">
                Get the latest blogs and resources delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your university email"
                className="flex-1 lg:w-72 px-5 py-3 bg-white/8 border border-white/15 rounded-full text-white placeholder:text-white/35 outline-none focus:border-[#4eafc4] focus:bg-white/12 transition-all text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#4eafc4]/25 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
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
              comprehensive study materials since 2010.
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
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white/90 font-semibold mb-5 text-xs tracking-[0.12em] uppercase">
                {category}
              </h4>
              <ul className="space-y-3">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs">
            © {currentYear} VirtualU. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {socials.map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/6 hover:bg-[#4eafc4] flex items-center justify-center transition-all duration-200 group"
              >
                <Icon className="w-3.5 h-3.5 text-white/45 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
          <div className="flex gap-5 text-xs text-white/35">
            <Link
              href="#"
              className="hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-white/70 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-white/70 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-[#4eafc4] to-[#3a95aa] text-white shadow-lg flex items-center justify-center hover:shadow-[#4eafc4]/30 hover:scale-105 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
