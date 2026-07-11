"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  GraduationCap,
  Calculator,
  Lightbulb,
  HelpCircle,
  Award,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-12"
    >
      <motion.span
        variants={fadeUp}
        custom={0}
        className="inline-block px-4 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
      >
        {tag}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-[#0f1e35]"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          lineHeight: 1.25,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-[#64788f] max-w-2xl mx-auto text-base leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

const gradingData = [
  { grade: "A+", range: "85–100", gp: "4.00", status: "Excellent", color: "text-green-600" },
  { grade: "A", range: "80–84", gp: "3.70", status: "Excellent", color: "text-green-500" },
  { grade: "B+", range: "75–79", gp: "3.30", status: "Good", color: "text-teal-500" },
  { grade: "B", range: "70–74", gp: "3.00", status: "Good", color: "text-blue-500" },
  { grade: "C+", range: "65–69", gp: "2.50", status: "Satisfactory", color: "text-yellow-500" },
  { grade: "C", range: "60–64", gp: "2.00", status: "Satisfactory", color: "text-amber-500" },
  { grade: "C-", range: "55–59", gp: "1.50", status: "Pass", color: "text-orange-500" },
  { grade: "D", range: "50–54", gp: "1.00", status: "Pass", color: "text-orange-600" },
  { grade: "F", range: "0–49", gp: "0.00", status: "Fail", color: "text-red-500" },
];

const tips = [
  {
    icon: Target,
    title: "Know the Passing Criteria",
    description:
      "A grade of 'D' (50%) or above is required to pass a course. However, to earn a degree, maintain a minimum CGPA of 2.00.",
  },
  {
    icon: TrendingUp,
    title: "Focus on Credit Hours",
    description:
      "Courses with higher credit hours have a greater impact on your CGPA. Prioritize performing well in 3 and 4 credit-hour courses.",
  },
  {
    icon: Award,
    title: "Repeating Courses",
    description:
      "If you fail a course, you can repeat it. The new grade replaces the old one in CGPA calculation, helping you improve your overall standing.",
  },
  {
    icon: BookOpen,
    title: "Maintain Consistency",
    description:
      "A semester with average grades can lower your CGPA significantly. Aim for consistent performance across all semesters rather than occasional peaks.",
  },
  {
    icon: Calculator,
    title: "Use the GPA Calculator",
    description:
      "Before each semester, plan your target grades. Use VirtualU's GPA calculator to estimate your semester GPA and its effect on your CGPA.",
  },
  {
    icon: Lightbulb,
    title: "Watch Your 'W' Grade",
    description:
      "Withdrawing from a course (grade 'W') does not affect GPA, but too many withdrawals can raise concerns about academic commitment.",
  },
];

const faqs = [
  {
    q: "What is the minimum passing grade at Virtual University?",
    a: 'The minimum passing grade is "D", which requires a score of at least 50% in a course. If you score below 50%, you receive an "F" grade (0.00 grade points) and must repeat the course.',
  },
  {
    q: "How is GPA different from CGPA?",
    a: "GPA (Grade Point Average) is calculated for a single semester, while CGPA (Cumulative Grade Point Average) considers all semesters completed so far. CGPA is the weighted average of all earned grade points divided by total attempted credit hours.",
  },
  {
    q: "What happens if I fail a course (get an F grade)?",
    a: "You must retake the course. When you retake and pass it, the new grade replaces the 'F' in your CGPA calculation. However, the 'F' grade may still appear on your transcript depending on university policy.",
  },
  {
    q: "Does VU round up grades?",
    a: "VU does not typically round up grades. If your score is 79.4, you receive the grade for the 75–79 range (B+), not 80 (A). The grade boundaries are strictly followed.",
  },
  {
    q: "Can I improve my CGPA after a bad semester?",
    a: "Yes! A single low semester can be offset by performing well in subsequent semesters. Since CGPA is cumulative, consistently earning A and A+ grades in later semesters will bring your CGPA up over time.",
  },
  {
    q: "How do credit hours affect my GPA?",
    a: "Credit hours act as weights. A 3-credit course counts 3× more than a 1-credit course. This means getting an A in a 3-credit course contributes significantly more to your GPA than getting an A in a 1-credit lab or workshop.",
  },
];

function GPACalculatorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <Card className="border border-[#1c3557]/10 shadow-sm overflow-hidden rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-[#0f1e35] to-[#1c3557] text-white p-6">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Calculator className="w-5 h-5 text-[#4eafc4]" />
            GPA / CGPA Calculation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-[#0f1e35] mb-2 text-base">
              Semester GPA Formula
            </h4>
            <div className="bg-[#e8f4f7] rounded-xl p-4 font-mono text-sm text-[#1c3557] text-center">
              GPA = <span className="font-bold text-[#4eafc4]">Σ(Grade Points × Credit Hours)</span>{" "}
              ÷ <span className="font-bold text-[#4eafc4]">Σ(Credit Hours)</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#0f1e35] mb-2 text-base">
              CGPA Formula
            </h4>
            <div className="bg-[#e8f4f7] rounded-xl p-4 font-mono text-sm text-[#1c3557] text-center">
              CGPA = <span className="font-bold text-[#4eafc4]">Total Grade Points Earned</span>{" "}
              ÷ <span className="font-bold text-[#4eafc4]">Total Credit Hours Attempted</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#0f1e35] mb-3 text-base">Step-by-Step Example</h4>
            <div className="space-y-3">
              {[
                { step: "1", text: "Multiply the grade points of each course by its credit hours.", ex: 'e.g., A (3.70) in CS201 (3 cr) → 3.70 × 3 = 11.10 quality points' },
                { step: "2", text: "Sum all quality points for the semester.", ex: "Total quality points = 11.10 + 9.90 + 6.00 + ..." },
                { step: "3", text: "Divide total quality points by total credit hours.", ex: "Semester GPA = 33.00 ÷ 12 = 2.75" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4eafc4] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-[#0f1e35] text-sm">{item.text}</p>
                    <p className="text-[#64788f] text-xs mt-0.5">{item.ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function GradingPageClient() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* ── Hero ── */}
      <section className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#4eafc4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#2a4a73]/20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Official VU Policy
            </span>
            <h1
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.9rem, 6vw, 3rem)",
                lineHeight: 1.2,
              }}
            >
              VU Grading Scheme
            </h1>
            <p className="text-white/60 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed px-2">
              Understand how Virtual University of Pakistan evaluates student
              performance — from grade points and GPA to CGPA calculation.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {["A+ to F Scale", "GPA Formula", "CGPA Tips", "FAQs"].map(
                (label, i) => (
                  <span
                    key={label}
                    className="px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 rounded-full text-xs font-medium"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path d="M0 50L1440 50L1440 15C1200 50 960 0 720 25C480 50 240 0 0 15Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ── Grading Scale Table ── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <SectionHeading
            tag="Grading Scale"
            title="Official VU Grade Points"
            subtitle="Virtual University uses a 10-point grading scale from A+ to F. Each grade carries specific grade points used in GPA and CGPA calculations."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-[#1c3557]/10 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e8f4f7]">
                  <TableHead className="text-[#0f1e35] font-semibold py-4 pl-6">
                    Grade
                  </TableHead>
                  <TableHead className="text-[#0f1e35] font-semibold py-4">
                    Marks Range (%)
                  </TableHead>
                  <TableHead className="text-[#0f1e35] font-semibold py-4">
                    Grade Points
                  </TableHead>
                  <TableHead className="text-[#0f1e35] font-semibold py-4 pr-6">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gradingData.map((row, i) => (
                  <TableRow
                    key={row.grade}
                    className={
                      i === gradingData.length - 1
                        ? "bg-red-50/50"
                        : "hover:bg-[#f8fafc]"
                    }
                  >
                    <TableCell className="py-4 pl-6">
                      <span
                        className={`font-bold text-lg ${row.color}`}
                      >
                        {row.grade}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-[#0f1e35] font-medium">
                      {row.range}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className="bg-[#e8f4f7] text-[#4eafc4] font-semibold px-3 py-1"
                      >
                        {row.gp}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <span
                        className={`text-sm font-medium ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-[#64788f] text-sm mt-6 px-2"
          >
            <span className="font-semibold text-[#0f1e35]">Note:</span> A grade
            of &quot;D&quot; (1.00 GP) is the minimum passing grade. &quot;F&quot; (0.00 GP) is a
            failing grade and the course must be repeated.
          </motion.p>
        </div>
      </section>

      {/* ── GPA / CGPA Calculation ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <SectionHeading
            tag="Calculation"
            title="How GPA & CGPA Are Calculated"
            subtitle="Learn the formulas and step-by-step process VU uses to compute your semester GPA and overall CGPA."
          />

          <div className="max-w-2xl mx-auto">
            <GPACalculatorSection />
          </div>
        </div>
      </section>

      {/* ── Tips ── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <SectionHeading
            tag="Tips"
            title="Tips to Improve Your CGPA"
            subtitle="Practical strategies to help you maintain a strong academic record at Virtual University."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={tip.title}
                  ref={ref}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#1c3557]/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#e8f4f7] flex items-center justify-center mb-4">
                    <Icon className="w-5.5 h-5.5 text-[#4eafc4]" />
                  </div>
                  <h3 className="text-[#0f1e35] font-semibold mb-2 text-sm">
                    {tip.title}
                  </h3>
                  <p className="text-[#64788f] text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <SectionHeading
            tag="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions about the VU grading system, answered."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
            >
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-[#1c3557]/10 rounded-xl overflow-hidden bg-white shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="px-5 sm:px-6 py-4 text-[#0f1e35] font-medium text-sm hover:text-[#4eafc4] hover:no-underline [&[data-state=open]>svg]:text-[#4eafc4] text-left">
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e8f4f7] flex items-center justify-center">
                        <HelpCircle className="w-3.5 h-3.5 text-[#4eafc4]" />
                      </span>
                      {faq.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 sm:px-6 pb-4 text-[#64788f] text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4eafc4]/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="w-12 h-12 text-[#4eafc4] mx-auto mb-6" />
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                lineHeight: 1.2,
              }}
            >
              Ready to Calculate Your GPA?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 leading-relaxed text-sm sm:text-base px-2">
              Use VirtualU&apos;s interactive GPA calculator to plan your semester
              grades and track your academic progress.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
