/**
 * Centralized SEO keyword library derived from Google Keyword Planner data.
 * Use these in page metadata, blog AI prompts, and content generation.
 *
 * Data period: 1 July 2025 – 30 June 2026
 */

export type KeywordEntry = {
  keyword: string;
  volume: number;        // avg monthly searches
  competition: "Low" | "Medium" | "High" | "Unknown";
  trend: string;         // YoY change
};

/** Top keywords by search volume — use in primary metadata and H1s */
export const PRIMARY_KEYWORDS: KeywordEntry[] = [
  { keyword: "bs computer sciences", volume: 50000, competition: "Low", trend: "-90%" },
  { keyword: "bscs subjects", volume: 5000, competition: "Low", trend: "0%" },
  { keyword: "bscs subjects list", volume: 5000, competition: "Low", trend: "0%" },
  { keyword: "uni admission", volume: 5000, competition: "Low", trend: "0%" },
  { keyword: "opencourseware", volume: 5000, competition: "Low", trend: "0%" },
  { keyword: "bs software engineering", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "bs accounting and finance", volume: 500, competition: "Low", trend: "900%" },
  { keyword: "ms computer science subjects", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "ms in mass communication", volume: 500, competition: "Medium", trend: "900%" },
  { keyword: "pakistan virtual university", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "vu learning management system", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "bs in biotechnology", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "bs maths", volume: 500, competition: "Low", trend: "0%" },
  { keyword: "bscs subjects list in pakistan", volume: 500, competition: "Low", trend: "900%" },
  { keyword: "bscs courses", volume: 50, competition: "Low", trend: "-90%" },
];

/** Admission-intent keywords — use on /programs and admission pages */
export const ADMISSION_KEYWORDS: string[] = [
  "admission in vu",
  "admission virtual university",
  "vu online admission",
  "vu apply",
  "online admission university",
  "university online apply",
  "admissions vu",
  "admission portal vu",
  "admission portal virtual university",
  "admission date of virtual university",
  "admission fee of virtual university",
  "bba admission in virtual university",
  "bs biotechnology admission criteria",
  "mpa admission",
  "admission in bs computer science",
  "bs computer science admission requirements",
  "bs computer science eligibility criteria",
  "bscs eligibility criteria",
  "bs software engineering admission requirements",
  "online mba in pakistan",
  "mba private admission",
  "mba admission in virtual university",
];

/** Program-specific keywords — use on /programs/[slug] pages */
export const PROGRAM_KEYWORDS: Record<string, string[]> = {
  bscs: [
    "bs computer sciences",
    "bscs subjects",
    "bscs subjects list",
    "bscs subjects list in pakistan",
    "bs computer science subjects",
    "bscs 1st semester subjects",
    "bscs 2nd semester subjects",
    "bscs 3rd semester subjects",
    "bscs 4th semester subjects",
    "bscs semester wise subjects",
    "bscs courses",
    "bscs vu",
    "bs computer science virtual university",
    "bs computer science syllabus",
    "bs computer science in pakistan",
    "bs computer science subjects semester wise",
    "bscs degree in pakistan",
    "bscs program",
    "bscs first semester subjects",
    "bs computer science subjects list",
    "bs computer science subjects in pakistan",
    "cs101 introduction to computing",
    "cs101 lectures",
    "cs101 book",
  ],
  bsse: [
    "bs software engineering",
    "software engineering virtual university",
    "bs software engineering subjects",
    "bs software engineering fee structure",
    "bs software engineering admission requirements",
    "bs software engineering in pakistan",
    "bs software engineering eligibility criteria",
    "bsse vu study scheme",
  ],
  "bs-accounting-finance": [
    "bs accounting and finance",
    "bs accounting and finance subjects",
    "bs accounting and finance fee structure",
    "bs accounting and finance in pakistan",
    "bs accounting and finance subjects in pakistan",
    "adp accounting and finance",
    "associate degree in accounting and finance",
    "accounting and finance degree in pakistan",
  ],
  mba: [
    "vu mba",
    "mba virtual university",
    "online mba in pakistan",
    "virtual university mba fee structure",
    "virtual university mba 1.5 year",
    "mba subjects in pakistan",
    "mba executive in pakistan",
    "mba executive virtual university",
    "online mba programs in pakistan",
    "online mba executive in pakistan",
    "mba private admission",
    "mba in pakistan",
    "1.5 year mba in pakistan",
    "mba requirements in pakistan",
    "mba supply chain management in pakistan",
  ],
  bba: [
    "bba virtual university",
    "bba virtual university fee structure",
    "bba admission in virtual university",
    "bba from virtual university",
    "bba subjects virtual university",
    "bba vu",
    "bba vu study scheme",
    "online bba degree in pakistan",
  ],
  bsit: [
    "bs it in pakistan",
    "bs it subjects in pakistan",
    "bsit virtual university",
    "bsit first semester subjects",
    "bsit study scheme vu",
    "bs information technology subjects in pakistan",
  ],
  mscs: [
    "ms computer science subjects",
    "ms computer science in pakistan",
    "ms cs virtual university",
    "virtual university ms programs",
  ],
  mpa: [
    "mpa admission",
    "mpa subjects",
    "master in public administration course outline",
  ],
  biotechnology: [
    "bs in biotechnology",
    "bs biotechnology admission criteria",
    "bs biotechnology in virtual university",
  ],
  psychology: [
    "virtual university psychology courses",
    "vu psychology courses",
    "virtual university psychology",
    "ms in clinical psychology in virtual university",
    "bs psychology vu",
    "bs psychology vu study scheme",
    "online psychology courses in pakistan",
  ],
};

/** LMS & online study keywords */
export const LMS_KEYWORDS: string[] = [
  "vu learning management system",
  "university lms",
  "learning management system for university",
  "vu online courses",
  "virtual university online courses",
  "virtual university free online courses",
  "vu free courses",
  "vu short courses",
  "virtual university short courses",
  "opencourseware",
  "opencourseware universities",
  "best opencourseware",
  "virtual university of pakistan online courses",
  "student lms portal",
  "lms education login",
];

/** Blog topic clusters mapped to target keywords — seed for AI content generation */
export const BLOG_TOPIC_CLUSTERS: Array<{
  title: string;
  slug: string;
  targetKeywords: string[];
  category: string;
  intent: "informational" | "navigational" | "transactional";
}> = [
  {
    title: "Complete BSCS Subjects List Semester-Wise at Virtual University of Pakistan",
    slug: "bscs-subjects-list-semester-wise-virtual-university",
    targetKeywords: ["bscs subjects list", "bscs subjects", "bscs 1st semester subjects", "bscs semester wise subjects", "bs computer science subjects", "bscs courses", "bscs vu"],
    category: "Computer Science",
    intent: "informational",
  },
  {
    title: "BS Computer Sciences at VU: Admission, Fee Structure & Course Outline",
    slug: "bs-computer-sciences-virtual-university-admission-fee-course",
    targetKeywords: ["bs computer sciences", "bs computer science admission requirements", "bs computer science virtual university", "bs computer science syllabus", "bscs eligibility criteria", "bs computer science in pakistan"],
    category: "Computer Science",
    intent: "transactional",
  },
  {
    title: "VU MBA Programs: Fee Structure, Duration & Admission Requirements",
    slug: "vu-mba-programs-fee-structure-admission",
    targetKeywords: ["vu mba", "mba virtual university", "virtual university mba fee structure", "online mba in pakistan", "mba executive virtual university", "online mba programs in pakistan", "mba subjects in pakistan"],
    category: "Business Administration",
    intent: "transactional",
  },
  {
    title: "How to Apply for VU Online Admission: Step-by-Step Guide",
    slug: "vu-online-admission-guide-how-to-apply",
    targetKeywords: ["admission in vu", "admission virtual university", "vu online admission", "admission portal vu", "vu apply", "online admission university", "university online apply"],
    category: "Admissions",
    intent: "transactional",
  },
  {
    title: "BS Software Engineering at VU: Subjects, Fee & Eligibility Criteria",
    slug: "bs-software-engineering-virtual-university-subjects-fee",
    targetKeywords: ["bs software engineering", "software engineering virtual university", "bs software engineering subjects", "bs software engineering fee structure", "bs software engineering admission requirements"],
    category: "Software Engineering",
    intent: "informational",
  },
  {
    title: "VU LMS Guide: How to Login, Access Courses & Use the Learning Portal",
    slug: "vu-lms-guide-login-courses-learning-portal",
    targetKeywords: ["vu learning management system", "university lms", "vu online courses", "lms education login", "student lms portal", "virtual university online courses"],
    category: "LMS & Portal",
    intent: "navigational",
  },
  {
    title: "BBA at Virtual University: Fee Structure, Subjects & Admission",
    slug: "bba-virtual-university-fee-subjects-admission",
    targetKeywords: ["bba virtual university", "virtual university bba fee structure", "bba admission in virtual university", "bba subjects virtual university", "bba vu"],
    category: "Business Administration",
    intent: "informational",
  },
  {
    title: "VU Opencourseware: Free Online Courses for Pakistani Students",
    slug: "vu-opencourseware-free-online-courses-pakistan",
    targetKeywords: ["opencourseware", "opencourseware universities", "best opencourseware", "virtual university free online courses", "vu free courses", "virtual university of pakistan online courses"],
    category: "Free Courses",
    intent: "informational",
  },
  {
    title: "MS Computer Science Subjects at VU: Semester-Wise Course Outline",
    slug: "ms-computer-science-subjects-virtual-university",
    targetKeywords: ["ms computer science subjects", "virtual university masters programs", "virtual university ms programs", "ms business administration"],
    category: "Computer Science",
    intent: "informational",
  },
  {
    title: "BS Accounting & Finance at VU: Subjects, Fee & Career Prospects",
    slug: "bs-accounting-finance-virtual-university-subjects-career",
    targetKeywords: ["bs accounting and finance", "bs accounting and finance subjects", "bs accounting and finance fee structure", "accounting and finance degree in pakistan"],
    category: "Accounting & Finance",
    intent: "informational",
  },
];

/** Generate an SEO meta description for a program page */
export function programMetaDescription(programName: string, keywords: string[]): string {
  return `Complete guide to ${programName} at Virtual University of Pakistan. Learn about ${keywords.slice(0, 3).join(", ")}, fee structure, eligibility criteria, and how to apply for VU online admission. AI-generated study resources for VU students.`;
}

/** Generate SEO keywords array for a program page */
export function programKeywords(programSlug: string, extra: string[] = []): string[] {
  const base = PROGRAM_KEYWORDS[programSlug] || [];
  return [...base, ...extra, "Virtual University of Pakistan", "VU", "vu online admission", "admission virtual university"];
}
