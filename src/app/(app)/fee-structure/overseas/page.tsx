"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, DollarSign, AlertTriangle } from "lucide-react";
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
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "40",
    convocation: "50",
  },
  {
    program: "B.Ed",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "40",
    convocation: "50",
  },
  {
    program: "Bachelors",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "40",
    convocation: "50",
  },
  {
    program: "BS",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "40",
    convocation: "50",
  },
  {
    program: "BS—Lateral",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "40",
    convocation: "50",
  },
  {
    program: "Masters",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "50",
    convocation: "50",
  },
  {
    program: "MS",
    admission: "150",
    registration: "50",
    enrollment: "25",
    tuition: "60",
    convocation: "50",
  },
  {
    program: "Deficiency Semester(s)",
    admission: "100",
    registration: "–",
    enrollment: "15",
    tuition: "50",
    convocation: "–",
  },
  {
    program: "Bridging Semester (B.Ed)",
    admission: "100",
    registration: "–",
    enrollment: "15",
    tuition: "40",
    convocation: "–",
  },
  {
    program: "Diploma",
    admission: "100",
    registration: "50",
    enrollment: "15",
    tuition: "50",
    convocation: "–",
  },
  {
    program: "Specialization Certificate",
    admission: "100",
    registration: "50",
    enrollment: "50",
    tuition: "50",
    convocation: "–",
  },
  {
    program: "Zero Semester *",
    admission: "100",
    registration: "–",
    enrollment: "–",
    tuition: "330",
    convocation: "–",
  },
  {
    program: "Zero Semester (MS) *",
    admission: "100",
    registration: "–",
    enrollment: "–",
    tuition: "550",
    convocation: "–",
  },
  {
    program: "Short Courses *",
    admission: "25",
    registration: "25",
    enrollment: "–",
    tuition: "190",
    convocation: "–",
  },
  {
    program: "MBA Top-up",
    admission: "150",
    registration: "–",
    enrollment: "25",
    tuition: "60",
    convocation: "–",
  },
];

const notes = [
  "Admission fee includes degree verification fee.",
  "Entry Test (where applicable) will be charged @ USD 50/- and will be non-refundable.",
  "Lab fee for practical(s): BS (including Bachelors and Associate Degree Programs) @ $10/credit hr, Masters @ $10/credit hr, Diploma @ $10/credit hr.",
  "On enrollment of research/thesis work in MS programs, thesis fee @ $200/- will be charged in addition to per credit hour tuition fee.",
  "Convocation fee @ $50/- will be charged at the time of pass-out. Payment is mandatory to get transcript, degree and other certificates.",
  "Endowment fund contribution @ $10/- one time during entire degree program.",
  "* Tuition fee will be charged for full semester instead of per credit hour basis.",
];

export default function OverseasFeePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-20 relative overflow-hidden">
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
              US Dollars — USD
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
              Fee Structure — Overseas Students
            </h1>
            <p className="text-white/60 max-w-lg mx-auto">
              All fees are in US Dollars (USD). Tuition fee is per credit hour
              unless marked otherwise.
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
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
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
                <TableRow className="bg-gradient-to-r from-[#1c3557] to-[#0f1e35] hover:from-[#1c3557] hover:to-[#0f1e35]">
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
                    Enrollment Fee
                    <span className="block text-[10px] text-white/40 font-normal">
                      per semester
                    </span>
                  </TableHead>
                  <TableHead className="text-[#4eafc4] font-semibold whitespace-nowrap py-4 px-3 text-center">
                    Tuition Fee
                    <span className="block text-[10px] text-[#4eafc4]/60 font-normal">
                      per credit hr
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4] shrink-0" />
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
                      {row.enrollment}
                    </TableCell>
                    <TableCell className="text-center text-[#4eafc4] font-semibold py-4 px-3 tabular-nums">
                      {row.tuition}
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
