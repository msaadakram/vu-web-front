import { type Metadata } from "next";
import Link from "next/link";
import { getCategories, getProgramsGroupedByDegree, getDegreeTypes } from "@/lib/programs";
import { BookOpen, GraduationCap, Clock, ArrowRight, Sparkles } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Programs Offered — Virtual University of Pakistan",
  description:
    "Explore all undergraduate, graduate, diploma, and short course programs offered by Virtual University of Pakistan. Find your program — BS, MS, B.Ed, diplomas & more.",
  keywords: [
    "Virtual University programs",
    "VU undergraduate programs",
    "VU graduate programs",
    "VU diplomas",
    "VU short courses",
    "Pakistan online university programs",
  ],
  openGraph: {
    title: "Programs Offered — Virtual University of Pakistan",
    description:
      "Browse all degree programs, diplomas, and short courses at Virtual University of Pakistan. Undergraduate, graduate, and specialized certificate programs.",
    url: `${BASE_URL}/programs`,
    type: "website",
  },
  alternates: { canonical: `${BASE_URL}/programs` },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Programs Offered at Virtual University of Pakistan",
      description:
        "Complete listing of all academic programs at Virtual University of Pakistan including undergraduate, graduate, diploma, and short course programs.",
      url: `${BASE_URL}/programs`,
      provider: {
        "@type": "Organization",
        name: "Virtual University of Pakistan",
        url: BASE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Programs",
          item: `${BASE_URL}/programs`,
        },
      ],
    },
  ],
};

const DEGREE_ICONS: Record<string, string> = {
  "BS-Lateral": "🎓",
  BS: "📘",
  "B.Ed": "🍎",
  "Associate Degree": "📖",
  MS: "🎯",
  Diploma: "📜",
  "Short Course": "⚡",
  "Specialization Certificate": "🏅",
  "Zero Semester": "🌱",
};

export default function ProgramsPage() {
  const categories = getCategories();
  const degreeTypes = getDegreeTypes();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="relative pt-20 lg:pt-[72px] pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
          <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#4eafc4]/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#2dd4bf]/5 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-white/80 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#4eafc4]" />
                Academic Programs
              </span>

              <h1
                className="text-white mb-4"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 6vw, 3.5rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Programs{" "}
                <span className="bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] bg-clip-text text-transparent">
                  Offered
                </span>{" "}
                at Virtual University
              </h1>

              <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-2">
                Virtual University offers a variety of undergraduate, graduate,
                diploma, short courses, specialization, and zero semester
                programs to cater to diverse academic interests.
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 48" fill="none" className="w-full h-auto">
              <path
                d="M0 48L60 42C120 36 240 24 360 20C480 16 600 20 720 26C840 32 960 40 1080 42C1200 44 1320 40 1380 38L1440 36V48H0Z"
                fill="#f8fafc"
              />
            </svg>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16 sm:pb-20">
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-16">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/programs#${cat.key.toLowerCase().replace(/\s+/g, "-")}`}
                className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8f4f7] flex items-center justify-center mb-4 group-hover:bg-[#4eafc4] group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5 text-[#4eafc4] group-hover:text-white transition-colors" />
                </div>
                <h3
                  className="text-[#0f172a] mb-1 group-hover:text-[#4eafc4] transition-colors"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {cat.label}
                </h3>
                <p className="text-[#64788b] text-sm mb-3">{cat.description}</p>
                <span className="text-[#4eafc4] text-xs font-semibold flex items-center gap-1">
                  {cat.count} program{cat.count !== 1 ? "s" : ""}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          {/* Programs by Category */}
          {categories.map((cat) => {
            const groups = getProgramsGroupedByDegree(cat.key);
            return (
              <section
                key={cat.key}
                id={cat.key.toLowerCase().replace(/\s+/g, "-")}
                className="mb-12 sm:mb-16 scroll-mt-24"
              >
                <div className="mb-6 sm:mb-8">
                  <h2
                    className="text-[#0f172a] mb-2"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)",
                    }}
                  >
                    {cat.label}
                  </h2>
                  <p className="text-[#64788b] text-sm">{cat.description}</p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {groups.map((group) => (
                    <div key={group.degree}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">{DEGREE_ICONS[group.degree] || "📚"}</span>
                        <h3 className="text-[#0f172a] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                          {group.degree}
                          {group.degree === "BS-Lateral"
                            ? " (2 Years)"
                            : group.degree === "BS"
                              ? " (4 Years)"
                              : group.degree === "Diploma"
                                ? " (1 Year)"
                                : group.degree === "Short Course"
                                  ? " (4 Months)"
                                  : group.degree === "Zero Semester"
                                    ? " (4 Months)"
                                    : group.degree === "B.Ed"
                                      ? " Programs"
                                      : group.degree === "Associate Degree"
                                        ? " (2 Years)"
                                        : group.degree === "MS"
                                          ? " Programs"
                                          : group.degree === "Specialization Certificate"
                                            ? " (One Semester)"
                                            : ""}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {group.programs.map((prog) => (
                          <Link
                            key={prog.slug}
                            href={`/programs/${prog.slug}`}
                            className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-[#4eafc4]/40 hover:shadow-md hover:shadow-[#4eafc4]/5 hover:-translate-y-0.5 transition-all duration-200 group/prog"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#f0f7fa] flex items-center justify-center shrink-0 group-hover/prog:bg-[#4eafc4]/10 transition-colors">
                              <BookOpen className="w-4 h-4 text-[#4eafc4]" />
                            </div>
                            <span className="text-[#0f172a] text-sm font-medium leading-snug group-hover/prog:text-[#4eafc4] transition-colors">
                              {prog.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
