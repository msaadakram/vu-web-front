"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  IndianRupee,
  DollarSign,
  Heart,
  Receipt,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const categories = [
  {
    href: "/fee-structure/local",
    icon: IndianRupee,
    title: "Local (PKR)",
    description:
      "Fee structure for Pakistani students in Pakistani Rupee. Includes admission, tuition, exam, and other semester fees for all degree programs.",
    gradient: "from-[#4eafc4] to-[#3a95aa]",
    badge: "PKR",
  },
  {
    href: "/fee-structure/overseas",
    icon: DollarSign,
    title: "Overseas (USD)",
    description:
      "Fee structure for international students in US Dollars. Covers all degree programs with per-credit-hour tuition rates.",
    gradient: "from-[#1c3557] to-[#2a4a73]",
    badge: "USD",
  },
  {
    href: "/fee-structure/disabled-local",
    icon: Heart,
    title: "Disabled — Local (PKR)",
    description:
      "50% concession on all fees for disabled students. Tuition fee is free. Rates in Pakistani Rupee.",
    gradient: "from-[#e0526e] to-[#c73d5a]",
    badge: "50% Off",
  },
  {
    href: "/fee-structure/disabled-overseas",
    icon: Heart,
    title: "Disabled — Overseas (USD)",
    description:
      "50% concession on all fees for overseas disabled students. Tuition fee is free. Rates in US Dollars.",
    gradient: "from-[#e0526e] to-[#c73d5a]",
    badge: "50% Off",
  },
  {
    href: "/fee-structure/other-charges",
    icon: Receipt,
    title: "Other Charges",
    description:
      "Additional fees for registrar services, examination services, and academic services. Both PKR and USD rates.",
    gradient: "from-[#f59e0b] to-[#d97706]",
    badge: "Misc",
  },
];

export default function FeeStructurePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2a4a73]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Tuition & Fees
            </span>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.2,
              }}
            >
              Fee Structure
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive fee details for all degree programs at Virtual
              University of Pakistan. Find the right fee structure based on your
              student category.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path
              d="M0 50L1440 50L1440 15C1200 50 960 0 720 25C480 50 240 0 0 15Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.href} href={cat.href}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="group bg-white rounded-2xl border border-[#1c3557]/8 overflow-hidden hover:shadow-xl hover:shadow-[#1c3557]/6 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  {/* Top accent gradient */}
                  <div
                    className={`h-1.5 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-2.5 py-1 bg-[#eef3f7] text-[#64788f] rounded-full text-[11px] font-semibold tracking-wide uppercase">
                        {cat.badge}
                      </span>
                    </div>

                    <h3
                      className="text-[#0f1e35] mb-2 group-hover:text-[#4eafc4] transition-colors"
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                      }}
                    >
                      {cat.title}
                    </h3>

                    <p className="text-[#64788f] text-sm leading-relaxed flex-1">
                      {cat.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#1c3557]/5 flex items-center gap-1 text-[#4eafc4] text-sm font-semibold group-hover:gap-2 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4 transition-all" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center"
        >
          <p className="text-amber-800 text-sm font-medium">
            ⚠️ Disclaimer
          </p>
          <p className="text-amber-700 text-xs mt-1">
            The University reserves the right to change the fee structure from
            time to time. Please verify with the official VU website for the
            most up-to-date information.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
