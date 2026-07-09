import type { Metadata } from "next";
import GradingPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Grading Scheme — VU GPA & CGPA Calculator",
  description:
    "Complete guide to Virtual University of Pakistan's grading scheme. Learn about grade points, GPA calculation, CGPA formula, passing grades, and tips to improve your academic performance at VU.",
  keywords: [
    "VU grading scheme",
    "Virtual University grading system",
    "VU GPA calculator",
    "VU CGPA calculation",
    "grade points VU",
    "Virtual University GPA",
    "VU passing grade",
    "Pakistan university grading",
  ],
  openGraph: {
    title: "Grading Scheme — VU GPA & CGPA Calculator | VirtualU",
    description:
      "Complete guide to Virtual University of Pakistan's grading scheme with grade points, GPA calculation, and CGPA formula.",
  },
};

export default function GradingPage() {
  return <GradingPageClient />;
}
