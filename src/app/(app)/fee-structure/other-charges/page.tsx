"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Receipt, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sections = [
  {
    title: "Registrar Office",
    rows: [
      { service: "Id Card (Duplicate)", local: "500", overseas: "20" },
      { service: "NOC / Migration Certificate", local: "500", overseas: "20" },
      {
        service: "Bonafide Certificate (Student / CGPA / English / Project)",
        local: "500",
        overseas: "20",
      },
      { service: "Correction in Student's Profile", local: "500", overseas: "20" },
      { service: "Course Exemptions / Transfer of Credit", local: "1,000", overseas: "25" },
      { service: "Issuance of Course Contents", local: "1,000", overseas: "25" },
      { service: "Readmission", local: "2,000", overseas: "50" },
      { service: "Semester Freeze", local: "2,000", overseas: "50" },
      { service: "Conversion / Change of Degree Program", local: "2,000", overseas: "50" },
      { service: "Study Program Change (Bachelors)", local: "2,000", overseas: "50" },
      { service: "Study Program Change (Masters)", local: "4,000", overseas: "100" },
    ],
  },
  {
    title: "Examination",
    rows: [
      { service: "Rechecking", local: "500", overseas: "20" },
      { service: "Certificate Fee (for each qualified course)", local: "500", overseas: "20" },
      { service: "Verification Fee for Documents / Degree", local: "500", overseas: "20" },
      { service: "Transcript Fee / Partial / Duplicate", local: "500", overseas: "20" },
      { service: "Degree Fee / Urgent / Duplicate", local: "2,000", overseas: "50" },
      {
        service: "Correction & Reissuance of Transcript & Certificates (before degree issuance)",
        local: "1,000",
        overseas: "25",
      },
      {
        service: "Correction & Reissuance of Degree, Transcript & Certificates (after degree issuance)",
        local: "3,000",
        overseas: "75",
      },
      { service: "Date Sheet — Late Fee", local: "500", overseas: "20" },
      { service: "Date Sheet — Double Late Fee", local: "1,000", overseas: "25" },
      { service: "Rescheduling Fee (for each paper)", local: "2,000", overseas: "25" },
      { service: "Publication of early result of Thesis / Project", local: "5,000", overseas: "–" },
    ],
  },
  {
    title: "Rector's Office",
    rows: [
      {
        service: "Appeal against decision of Committee of unfair Means / Discipline Advisory Committee",
        local: "1,000",
        overseas: "25",
      },
      {
        service: "Review Appeal against the decision of the Rector",
        local: "2,000",
        overseas: "50",
      },
    ],
  },
  {
    title: "Academics",
    rows: [
      {
        service: "CS619 — Late submission fee for Last deliverable of Final Year Project (within 15 days after due date)",
        local: "1,500",
        overseas: "50",
      },
      {
        service: "CS619 — Late submission fee (next 15 days after extended date)",
        local: "3,000",
        overseas: "75",
      },
    ],
  },
];

const importantNotes = [
  "All charges are non-refundable unless otherwise specified.",
  "Payment must be made through official university payment channels only.",
  "Processing time for services may vary based on the nature of request.",
  "For overseas students, payments should be made in USD through designated international payment methods.",
  "The university reserves the right to revise these charges without prior notice.",
];

export default function OtherChargesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2a4a73]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Additional Fees & Services
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
              Schedule of Other Charges
            </h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Additional fees for registrar services, examination services,
              academic services, and other university processes.
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

        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: si * 0.1 }}
            className="bg-white rounded-2xl border border-[#1c3557]/8 shadow-sm overflow-hidden mb-8"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[#1c3557] to-[#0f1e35]">
              <h3
                className="text-white font-semibold"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {section.title}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#eef3f7] hover:bg-[#eef3f7]">
                    <TableHead className="text-[#0f1e35] font-semibold py-4 px-4">
                      Service
                    </TableHead>
                    <TableHead className="text-[#0f1e35] font-semibold py-4 px-4 text-center w-36">
                      Local (PKR)
                    </TableHead>
                    <TableHead className="text-[#0f1e35] font-semibold py-4 px-4 text-center w-36">
                      Overseas (USD)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.rows.map((row, idx) => (
                    <TableRow
                      key={row.service}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-[#f0f7fa]"
                          : "bg-[#f8fafc] hover:bg-[#f0f7fa]"
                      }
                    >
                      <TableCell className="text-[#0f1e35] py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          {row.service}
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-[#1c3557] py-4 px-4 tabular-nums font-medium">
                        {row.local}
                      </TableCell>
                      <TableCell className="text-center text-[#1c3557] py-4 px-4 tabular-nums font-medium">
                        {row.overseas}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        ))}

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 bg-white rounded-2xl border border-[#1c3557]/8 p-7 shadow-sm"
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
            {importantNotes.map((note, i) => (
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
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-center"
        >
          <p className="text-amber-800 text-xs font-semibold mb-0.5">
            ⚠️ Disclaimer
          </p>
          <p className="text-amber-700 text-xs">
            The University reserves the right to revise these charges without
            prior notice. Verify with the official VU website for the most
            up-to-date information.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
