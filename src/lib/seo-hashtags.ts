/**
 * SEO Hashtag & Interlinking System
 * All hashtags derived from Google Keyword Planner CSV (Jul 2025 – Jun 2026)
 * Used across all blog posts, program pages, and resource pages.
 */

export type HashtagCategory =
  | "programs"
  | "admissions"
  | "courses_lms"
  | "subjects"
  | "mba_business"
  | "general";

export type SeoHashtag = {
  tag: string;       // display label e.g. "BSCS Subjects"
  slug: string;      // URL-safe e.g. "bscs-subjects"
  keyword: string;   // exact keyword from CSV
  volume: number;
  category: HashtagCategory;
};

/** Master hashtag registry — sourced from CSV keyword data */
export const SEO_HASHTAGS: SeoHashtag[] = [
  // ── Programs ──
  { tag: "BS Computer Sciences", slug: "bs-computer-sciences", keyword: "bs computer sciences", volume: 50000, category: "programs" },
  { tag: "BSCS", slug: "bscs", keyword: "bscs subjects", volume: 5000, category: "programs" },
  { tag: "BS Software Engineering", slug: "bs-software-engineering", keyword: "bs software engineering", volume: 500, category: "programs" },
  { tag: "BS Accounting & Finance", slug: "bs-accounting-finance", keyword: "bs accounting and finance", volume: 500, category: "programs" },
  { tag: "BS Biotechnology", slug: "bs-biotechnology", keyword: "bs in biotechnology", volume: 500, category: "programs" },
  { tag: "BS Maths", slug: "bs-maths", keyword: "bs maths", volume: 500, category: "programs" },
  { tag: "BBA Virtual University", slug: "bba-virtual-university", keyword: "bba virtual university", volume: 50, category: "programs" },
  { tag: "VU MBA", slug: "vu-mba", keyword: "vu mba", volume: 50, category: "programs" },
  { tag: "MS Computer Science", slug: "ms-computer-science", keyword: "ms computer science subjects", volume: 500, category: "programs" },
  { tag: "MS Mass Communication", slug: "ms-mass-communication", keyword: "ms in mass communication", volume: 500, category: "programs" },
  { tag: "MPA Admission", slug: "mpa-admission", keyword: "mpa admission", volume: 50, category: "programs" },
  { tag: "VU PhD Programs", slug: "vu-phd-programs", keyword: "virtual university phd programs", volume: 50, category: "programs" },
  { tag: "BS Public Administration", slug: "bs-public-administration", keyword: "bs public administration subjects", volume: 50, category: "programs" },
  { tag: "MS Business Administration", slug: "ms-business-administration", keyword: "ms business administration", volume: 50, category: "programs" },
  { tag: "Virtual University Psychology", slug: "virtual-university-psychology", keyword: "virtual university psychology", volume: 50, category: "programs" },
  { tag: "VU Data Science", slug: "vu-data-science", keyword: "virtual university data science", volume: 50, category: "programs" },
  // ── Admissions ──
  { tag: "VU Admission", slug: "vu-admission", keyword: "admission in vu", volume: 50, category: "admissions" },
  { tag: "VU Online Admission", slug: "vu-online-admission", keyword: "vu online admission", volume: 50, category: "admissions" },
  { tag: "Online MBA Pakistan", slug: "online-mba-pakistan", keyword: "online mba in pakistan", volume: 50, category: "admissions" },
  { tag: "University Online Apply", slug: "university-online-apply", keyword: "university online apply", volume: 50, category: "admissions" },
  { tag: "BSCS Eligibility", slug: "bscs-eligibility", keyword: "bscs eligibility criteria", volume: 50, category: "admissions" },
  { tag: "MBA Private Admission", slug: "mba-private-admission", keyword: "mba private admission", volume: 50, category: "admissions" },
  { tag: "Uni Admission", slug: "uni-admission", keyword: "uni admission", volume: 5000, category: "admissions" },
  // ── Courses & LMS ──
  { tag: "VU LMS", slug: "vu-lms", keyword: "vu learning management system", volume: 500, category: "courses_lms" },
  { tag: "VU Online Courses", slug: "vu-online-courses", keyword: "vu online courses", volume: 50, category: "courses_lms" },
  { tag: "Opencourseware", slug: "opencourseware", keyword: "opencourseware", volume: 5000, category: "courses_lms" },
  { tag: "VU Free Courses", slug: "vu-free-courses", keyword: "vu free courses", volume: 50, category: "courses_lms" },
  { tag: "VU Short Courses", slug: "vu-short-courses", keyword: "vu short courses", volume: 50, category: "courses_lms" },
  { tag: "University LMS", slug: "university-lms", keyword: "university lms", volume: 50, category: "courses_lms" },
  // ── Subjects ──
  { tag: "BSCS Subjects", slug: "bscs-subjects", keyword: "bscs subjects", volume: 5000, category: "subjects" },
  { tag: "BSCS Subjects List", slug: "bscs-subjects-list", keyword: "bscs subjects list in pakistan", volume: 500, category: "subjects" },
  { tag: "BS CS Subjects", slug: "bs-cs-subjects", keyword: "bs computer science subjects", volume: 50, category: "subjects" },
  { tag: "BS SE Subjects", slug: "bs-se-subjects", keyword: "bs software engineering subjects", volume: 50, category: "subjects" },
  { tag: "BS AF Subjects", slug: "bs-af-subjects", keyword: "bs accounting and finance subjects", volume: 50, category: "subjects" },
  { tag: "MS CS Subjects", slug: "ms-cs-subjects", keyword: "ms computer science subjects", volume: 500, category: "subjects" },
  // ── MBA & Business ──
  { tag: "MBA Virtual University", slug: "mba-virtual-university", keyword: "mba virtual university", volume: 50, category: "mba_business" },
  { tag: "MBA Pakistan", slug: "mba-pakistan", keyword: "mba in pakistan", volume: 50, category: "mba_business" },
  { tag: "MBA Executive", slug: "mba-executive", keyword: "mba executive in pakistan", volume: 50, category: "mba_business" },
  { tag: "MBA Subjects Pakistan", slug: "mba-subjects-pakistan", keyword: "mba subjects in pakistan", volume: 50, category: "mba_business" },
  { tag: "Supply Chain MBA", slug: "supply-chain-mba", keyword: "mba supply chain management in pakistan", volume: 50, category: "mba_business" },
  { tag: "HRM Masters", slug: "hrm-masters", keyword: "masters in human resource management subjects", volume: 50, category: "mba_business" },
  // ── General ──
  { tag: "Pakistan Virtual University", slug: "pakistan-virtual-university", keyword: "pakistan virtual university", volume: 500, category: "general" },
  { tag: "Virtual University Lahore", slug: "virtual-university-lahore", keyword: "virtual university lahore", volume: 50, category: "general" },
  { tag: "VU Pakistan", slug: "vu-pakistan", keyword: "pakistan virtual university", volume: 500, category: "general" },
];

/** Get hashtags for a given category */
export function getHashtagsByCategory(category: HashtagCategory): SeoHashtag[] {
  return SEO_HASHTAGS.filter((h) => h.category === category);
}

/** Get top N hashtags by volume */
export function getTopHashtags(n = 10): SeoHashtag[] {
  return [...SEO_HASHTAGS].sort((a, b) => b.volume - a.volume).slice(0, n);
}

/**
 * Match blog tags/keywords against SEO hashtag registry.
 * Returns enriched hashtags with slugs so they can be rendered as links.
 */
export function matchHashtags(tags: string[], keywords: string[] = []): SeoHashtag[] {
  const combined = [...tags, ...keywords].map((t) => t.toLowerCase());
  return SEO_HASHTAGS.filter((h) =>
    combined.some(
      (t) =>
        t.includes(h.keyword.toLowerCase()) ||
        h.keyword.toLowerCase().includes(t) ||
        t.includes(h.slug.replace(/-/g, " "))
    )
  );
}

/**
 * Build the blog interlinking map.
 * Given a blog's tags + category, returns related blog slugs.
 */
export function getRelatedBlogSlugs(
  currentSlug: string,
  category: string,
  tags: string[]
): string[] {
  // Map of category → high-value internal blog slugs to suggest
  const categoryLinks: Record<string, string[]> = {
    "Computer Science": [
      "bscs-subjects-list-semester-wise-vu",
      "bs-computer-sciences-virtual-university-admission-fee-course",
      "ms-computer-science-subjects-virtual-university",
      "vu-lms-guide-login-courses-learning-portal",
    ],
    "Software Engineering": [
      "bs-software-engineering-virtual-university-subjects-fee",
      "bscs-subjects-list-semester-wise-vu",
      "vu-online-admission-guide",
    ],
    "Business Administration": [
      "vu-mba-programs-fee-structure-admission",
      "bba-virtual-university-fee-subjects-admission",
      "vu-online-admission-guide",
    ],
    "Admissions": [
      "vu-online-admission-guide",
      "bscs-subjects-list-semester-wise-vu",
      "vu-mba-programs-fee-structure-admission",
      "bba-virtual-university-fee-subjects-admission",
    ],
    "LMS & Portal": [
      "vu-lms-guide-login-courses-learning-portal",
      "vu-opencourseware-free-online-courses-pakistan",
      "bscs-subjects-list-semester-wise-vu",
    ],
    "Free Courses": [
      "vu-opencourseware-free-online-courses-pakistan",
      "vu-lms-guide-login-courses-learning-portal",
      "bscs-subjects-list-semester-wise-vu",
    ],
    "Accounting & Finance": [
      "bs-accounting-finance-virtual-university-subjects-career",
      "vu-mba-programs-fee-structure-admission",
      "vu-online-admission-guide",
    ],
  };

  const links = categoryLinks[category] || [
    "vu-online-admission-guide",
    "bscs-subjects-list-semester-wise-vu",
    "vu-lms-guide-login-courses-learning-portal",
  ];

  return links.filter((slug) => slug !== currentSlug).slice(0, 3);
}

/**
 * Blog-to-blog keyword anchor text map.
 * When body text contains these phrases, suggest linking to the mapped slug.
 */
export const INTERNAL_LINK_MAP: Record<string, { slug: string; anchor: string }> = {
  "bscs subjects": { slug: "/blog/bscs-subjects-list-semester-wise-vu", anchor: "BSCS subjects list semester-wise" },
  "bscs subjects list": { slug: "/blog/bscs-subjects-list-semester-wise-vu", anchor: "complete BSCS subjects list" },
  "bs computer sciences": { slug: "/blog/bs-computer-sciences-virtual-university-admission-fee-course", anchor: "BS Computer Sciences at VU" },
  "vu admission": { slug: "/blog/vu-online-admission-guide", anchor: "VU online admission guide" },
  "vu online admission": { slug: "/blog/vu-online-admission-guide", anchor: "how to apply for VU admission" },
  "mba virtual university": { slug: "/blog/vu-mba-programs-fee-structure-admission", anchor: "VU MBA programs" },
  "vu mba": { slug: "/blog/vu-mba-programs-fee-structure-admission", anchor: "VU MBA fee structure" },
  "bba virtual university": { slug: "/blog/bba-virtual-university-fee-subjects-admission", anchor: "BBA at Virtual University" },
  "vu lms": { slug: "/blog/vu-lms-guide-login-courses-learning-portal", anchor: "VU LMS guide" },
  "learning management system": { slug: "/blog/vu-lms-guide-login-courses-learning-portal", anchor: "VU Learning Management System" },
  "opencourseware": { slug: "/blog/vu-opencourseware-free-online-courses-pakistan", anchor: "VU opencourseware" },
  "ms computer science": { slug: "/blog/ms-computer-science-subjects-virtual-university", anchor: "MS Computer Science at VU" },
  "bs software engineering": { slug: "/blog/bs-software-engineering-virtual-university-subjects-fee", anchor: "BS Software Engineering at VU" },
  "bs accounting and finance": { slug: "/blog/bs-accounting-finance-virtual-university-subjects-career", anchor: "BS Accounting & Finance at VU" },
};
