"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, BookOpen, Users, Award, Globe, Heart, Target, Lightbulb, Mail, MapPin, Upload, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const values = [
  { icon: Target, title: "Excellence", desc: "We hold ourselves to the highest academic standards in every resource we produce." },
  { icon: Heart, title: "Accessibility", desc: "Quality education should be available to every student, regardless of location or means." },
  { icon: Lightbulb, title: "Innovation", desc: "Continuously evolving our platform to incorporate the latest in educational technology." },
  { icon: Globe, title: "Impact", desc: "Creating measurable positive outcomes for students across Pakistan and beyond." },
];

function ValueCard({ value, i }: { value: (typeof values)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { icon: Icon, title, desc } = value;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className="bg-white rounded-2xl p-7 border border-[#1c3557]/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#e8f4f7] flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-[#4eafc4]" />
      </div>
      <h3 className="text-[#0f1e35] font-semibold mb-2">{title}</h3>
      <p className="text-[#64788f] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Our Story
            </span>
            <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.9rem, 6vw, 3rem)", lineHeight: 1.2 }}>
              About VirtualU
            </h1>
            <p className="text-white/65 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
              VirtualU is an independent, community-driven study hub built by students for students of Virtual University of Pakistan. We organize BSCS subjects, opencourseware resources, admission guides, and exam materials in one place.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-400/15 border border-amber-300/30 text-amber-100 rounded-full text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              Not affiliated with Virtual University of Pakistan. The official site is{" "}
              <a href="https://www.vu.edu.pk" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">vu.edu.pk</a>.
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path d="M0 50L1440 50L1440 15C1200 50 960 0 720 25C480 50 240 0 0 15Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div ref={missionRef} className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div initial="hidden" animate={missionInView ? "visible" : "hidden"}>
              <motion.span variants={fadeUp} custom={0} className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
                Our Mission
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "#0f1e35", lineHeight: 1.3 }}
              >
                Making Quality Education Accessible to Every Pakistani Student
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="mt-5 text-[#64788f] leading-relaxed">
                VirtualU was born from a simple belief: every student deserves access to the best study materials, regardless of where they live or their economic background. We bridge the gap between university education and student success.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="mt-4 text-[#64788f] leading-relaxed">
                From meticulously curated past papers to AI-assisted study guides, our platform serves students enrolled in Virtual University of Pakistan and partner institutions — built by the community, for the community.
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { val: "100+", label: "Academic Programs" },
                  { val: "Free", label: "For Students" },
                  { val: "AI", label: "Study Guides" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 sm:p-4 bg-[#f8fafc] rounded-xl">
                    <div className="text-[#4eafc4] font-bold text-lg sm:text-xl">{s.val}</div>
                    <div className="text-[#64788f] text-[11px] sm:text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#0f1e35] to-[#1c3557] rounded-3xl p-7 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#4eafc4]/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#4eafc4]/20 flex items-center justify-center mb-6">
                    <GraduationCap className="w-8 h-8 text-[#4eafc4]" />
                  </div>
                  <blockquote
                    className="text-white mb-6"
                    style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)", fontStyle: "italic", lineHeight: 1.5 }}
                  >
                    &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                  </blockquote>
                  <p className="text-white/50 text-sm">— Our founding principle</p>
                  <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    {[
                      { icon: BookOpen, val: "AI", label: "Assisted Guides" },
                      { icon: Users, val: "Community", label: "Driven" },
                      { icon: Award, val: "Free", label: "Resources" },
                      { icon: Globe, val: "Pakistan", label: "Nationwide" },
                    ].map(({ icon: Icon, val, label }) => (
                      <div key={label} className="flex items-center gap-3 min-w-0">
                        <Icon className="w-5 h-5 text-[#4eafc4] shrink-0" />
                        <div className="min-w-0">
                          <div className="text-white font-semibold text-sm">{val}</div>
                          <div className="text-white/40 text-xs">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              Core Values
            </span>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", color: "#0f1e35" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((value, i) => <ValueCard key={value.title} value={value} i={i} />)}
          </div>
        </div>
      </section>

      {/* Values recap */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              How It Works
            </span>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", color: "#0f1e35" }}>
              Built by Students, for Students
            </h2>
            <p className="text-[#64788f] max-w-xl mx-auto mt-4 text-sm sm:text-base px-2">
              VirtualU is a community-driven platform. Students upload resources, and our AI turns each upload into a clear, structured study guide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: Upload, title: "Upload", desc: "Students contribute assignments, past papers, and handouts to the shared library." },
              { icon: Sparkles, title: "AI Generates", desc: "Each upload is turned into an SEO-optimized study guide with sections and FAQs." },
              { icon: BookOpen, title: "Everyone Learns", desc: "Articles and resources are free to browse, search, and download for all students." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#f8fafc] rounded-2xl p-6 sm:p-7 border border-[#1c3557]/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4eafc4] to-[#3a95aa] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0f1e35] font-bold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>{title}</h3>
                <p className="text-[#64788f] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white mb-5" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
              Get in Touch
            </h2>
            <p className="text-white/60 mb-10 sm:mb-12 text-sm sm:text-base px-2">Have questions? We&apos;re here to help you succeed.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-xl mx-auto">
              {[
                { icon: Mail, label: "Email", val: "hello@virtualuniversity.app" },
                { icon: MapPin, label: "Location", val: "Islamabad, Pakistan" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:p-6">
                  <div className="w-11 h-11 rounded-xl bg-[#4eafc4]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-[#4eafc4]" />
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-white font-medium text-sm break-words">{val}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
