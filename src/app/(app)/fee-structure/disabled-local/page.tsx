"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Heart, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    program: "Associate Degree Programs",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "B.Ed",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "Bachelors",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "BS",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "BS—Lateral",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "Masters",
    admission: "2,500",
    registration: "1,250",
    security: "2,500",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "MS",
    admission: "3,500",
    registration: "1,250",
    security: "5,000",
    processing: "250",
    enrollment: "1,500",
    tuition: "FREE",
    exam: "250",
    convocation: "1,000",
  },
  {
    program: "Ph.D",
    admission: "3,500",
    registration: "1,250",
    security: "5,000",
    processing: "250",
    enrollment: "1,500",
    tuition: "FREE",
    exam: "–",
    convocation: "1,000",
  },
  {
    program: "Deficiency Semester(s)",
    admission: "1,500",
    registration: "–",
    security: "–",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "–",
    convocation: "–",
  },
  {
    program: "Bridging Semester (B.Ed)",
    admission: "1,500",
    registration: "–",
    security: "–",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "–",
    convocation: "–",
  },
  {
    program: "Diploma",
    admission: "1,500",
    registration: "1,250",
    security: "1,000",
    processing: "250",
    enrollment: "500",
    tuition: "FREE",
    exam: "250",
    convocation: "–",
  },
  {
    program: "Specialization Certificate",
    admission: "1,500",
    registration: "1,250",
    security: "–",
    processing: "250",
    enrollment: "1,500",
    tuition: "FREE",
    exam: "250",
    convocation: "–",
  },
  {
    program: "Zero Semester *",
    admission: "1,500",
    registration: "–",
    security: "–",
    processing: "250",
    enrollment: "–",
    tuition: "FREE",
    exam: "250",
    convocation: "–",
  },
  {
    program: "Zero Semester (MS) *",
    admission: "1,500",
    registration: "–",
    security: "–",
    processing: "250",
    enrollment: "–",
    tuition: "FREE",
    exam: "–",
    convocation: "–",
  },
  {
    program: "Short Courses *",
    admission: "250",
    registration: "250",
    security: "–",
    processing: "250",
    enrollment: "–",
    tuition: "FREE",
    exam: "250",
    convocation: "–",
  },
  {
    program: "MBA Top-up",
    admission: "3,500",
    registration: "–",
    security: "–",
    processing: "250",
    enrollment: "1,500",
    tuition: "FREE",
    exam: "–",
    convocation: "–",
  },
];

const notes = [
  "Admission fee includes degree verification fee from the previous institution.",
  "Entry Test (where applicable) will be charged @ Rs. 500/- (50% concession) and will be non-refundable.",
  "Tuition fee is FREE for all disabled students.",
  "Lab fee for practical(s) (50% concession): CS Programs — BS/Bachelors/Associate @ Rs. 1,000/credit hr, Masters/Diploma @ Rs. 1,000/credit hr. Bio Sciences — Zero Semester @ Rs. 1,500, BS @ Rs. 1,500, Masters @ Rs. 1,500, MS @ Rs. 2,500, Diploma @ Rs. 1,000/credit hr.",
  "Thesis fee (50% concession, in addition to per credit hour tuition fee): MS @ Rs. 7,500/-, Ph.D @ Rs. 12,500/-.",
  "Research fee (50% concession): MS in Bioinformatics/Biotechnology/Genetics/Zoology/Molecular Biology @ Rs. 12,500/-, Ph.D @ Rs. 25,000/-.",
  "Research fee is charged at the time of enrolment of research work and is in addition to the Thesis fee.",
  "Convocation fee @ Rs. 1,000/- (50% concession) charged at pass-out. Mandatory to get transcript, degree and other certificates.",
  "Endowment fund contribution @ Rs. 500/- (50% concession) one time during entire degree program.",
  "Fee collection charges @ Rs. 50/- (50% concession) per semester.",
  "Societies, Clubs and Sports Fee is waived for disabled students.",
];

export default function DisabledLocalFeePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e0526e]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2a4a73]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-rose-500/15 border border-rose-300/30 text-rose-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              50% Concession — Tuition Free
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
              Fee Structure — Disabled Students (PKR)
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Special 50% concession on all fees for disabled students.
              Tuition fee is completely free. Rates in Pakistani Rupee.
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/fee-structure"
            className="inline-flex items-center gap-2 text-sm text-[#64788f] hover:text-[#4eafc4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Fee Structure
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#1c3557]/8 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-rose-600 to-[#c73d5a] hover:from-rose-600 hover:to-[#c73d5a]">
                  <TableHead className="text-white font-semibold whitespace-nowrap py-4 px-4">
                    Degree Program
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Admission Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      (one time)
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Registration Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      (one time)
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Security Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      (refundable)
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Processing Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      (incl. prospectus)
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Enrollment Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      per semester
                    </span>
                  </TableHead>
                  <TableHead className="text-emerald-300 font-semibold whitespace-nowrap py-4 px-3 text-center">
                    Tuition Fee
                    <span className="block text-[10px] text-emerald-300/60 font-normal">
                      per credit hr
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Exam Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      per semester
                    </span>
                  </TableHead>
                  <TableHead className="text-white/80 font-medium whitespace-nowrap py-4 px-3 text-center">
                    Convocation Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      (one time)
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow
                    key={row.program}
                    className={
                      idx % 2 === 0
                        ? "bg-white hover:bg-[#f0f7fa]"
                        : "bg-[#f8fafc] hover:bg-[#f0f7fa]"
                    }
                  >
                    <TableCell className="font-medium text-[#0f1e35] py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                        {row.program}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.admission}
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.registration}
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.security}
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.processing}
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.enrollment}
                    </TableCell>
                    <TableCell className="text-center text-emerald-600 font-bold py-4 px-3 tabular-nums">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full text-[11px]">
                        <Heart className="w-3 h-3" />
                        {row.tuition}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.exam}
                    </TableCell>
                    <TableCell className="text-center text-[#1c3557] py-4 px-3 tabular-nums">
                      {row.convocation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 bg-white rounded-2xl border border-[#1c3557]/8 p-7 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h3
              className="text-[#0f1e35] font-semibold"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Important Notes
            </h3>
          </div>
          <ul className="space-y-2.5">
            {notes.map((note, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#64788f]">
                <span className="w-5 h-5 rounded-full bg-[#e8f4f7] text-[#4eafc4] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {note}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-center"
        >
          <p className="text-amber-800 text-xs font-semibold mb-0.5">
            ⚠️ Disclaimer
          </p>
          <p className="text-amber-700 text-xs">
            The University reserves the right to change the fee structure from
            time to time. Verify with the official VU website for the most
            up-to-date information.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
