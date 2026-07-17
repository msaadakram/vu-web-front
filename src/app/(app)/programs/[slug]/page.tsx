import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramBySlug, allPrograms, getProgramUrl } from "@/lib/programs";
import { CheckCircle2, ArrowLeft, Briefcase, GraduationCap, Clock, Sparkles, BookOpen } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BLOG_PUBLIC_BASE_URL || "http://localhost:3000";

// Convert human-readable durations ("4 Years", "1.5 Years", "4 Months",
// "One Semester") to ISO 8601 durations for schema.org courseWorkload.
function isoDuration(duration: string): string {
  const m = duration.match(/([\d.]+)\s*year/i);
  if (m) {
    const years = parseFloat(m[1]);
    const whole = Math.floor(years);
    const months = Math.round((years - whole) * 12);
    return `P${whole}Y${months ? `${months}M` : ""}`;
  }
  const mo = duration.match(/([\d.]+)\s*month/i);
  if (mo) return `P${parseInt(mo[1], 10)}M`;
  if (/semester/i.test(duration)) return "P6M";
  return "P4Y";
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prog = getProgramBySlug(slug);
  if (!prog) return { title: "Program Not Found | Virtual University" };

  return {
    title: prog.metaTitle,
    description: prog.metaDescription,
    keywords: prog.keywords.join(", "),
    openGraph: {
      title: prog.metaTitle,
      description: prog.metaDescription,
      type: "article",
      url: getProgramUrl(slug),
    },
    twitter: {
      card: "summary_large_image",
      title: prog.metaTitle,
      description: prog.metaDescription,
    },
    alternates: { canonical: getProgramUrl(slug) },
    robots: { index: true, follow: true },
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const prog = getProgramBySlug(slug);

  if (!prog) notFound();

  const related = prog.relatedPrograms
    .map((s) => getProgramBySlug(s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: prog.title,
        description: prog.description,
        provider: {
          "@type": "Organization",
          name: "Virtual University of Pakistan",
          url: BASE_URL,
        },
        educationalCredentialAwarded: prog.degree,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "https://schema.org/Online",
          courseWorkload: isoDuration(prog.duration),
          instructor: {
            "@type": "Organization",
            name: "Virtual University of Pakistan",
            url: BASE_URL,
          },
        },
        // Tuition is set by VU per semester — we don't publish a fixed price
        // to avoid the misleading "Free" category. Availability is InStock
        // (seats are open); OnlineOnly is a courseMode, not availability.
        offers: {
          "@type": "Offer",
          category: "Tuition",
          availability: "https://schema.org/InStock",
          url: getProgramUrl(slug),
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
        inLanguage: "en-US",
        url: getProgramUrl(slug),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Programs",
            item: `${BASE_URL}/programs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: prog.title,
            item: getProgramUrl(slug),
          },
        ],
      },
      ...(prog.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: prog.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-[#f8fafc]">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] pt-20 lg:pt-[72px] pb-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#4eafc4] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </Link>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
                {prog.degree} Program
              </span>
              <h1
                className="text-white mb-4 max-w-3xl mx-auto"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 5vw, 2.75rem)",
                  lineHeight: 1.2,
                }}
              >
                {prog.title}
              </h1>
              <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
                {prog.description}
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 text-white/50 text-xs sm:text-sm flex-wrap">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  {prog.degree}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {prog.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {prog.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Overview */}
          <section className="mb-10 sm:mb-12">
            <h2
              className="text-[#0f1e35] mb-4"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 3.5vw, 1.5rem)",
              }}
            >
              Overview
            </h2>
            <p className="text-[#2d3b4f] leading-relaxed text-sm sm:text-base">
              {prog.longDescription}
            </p>
          </section>

          {/* Highlights */}
          <section className="mb-10 sm:mb-12">
            <h2
              className="text-[#0f1e35] mb-5"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 3.5vw, 1.5rem)",
              }}
            >
              Program Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prog.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#4eafc4] shrink-0 mt-0.5" />
                  <span className="text-[#2d3b4f] text-sm leading-relaxed">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Career Opportunities */}
          <section className="mb-10 sm:mb-12">
            <h2
              className="text-[#0f1e35] mb-5"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.3rem, 3.5vw, 1.5rem)",
              }}
            >
              Career Opportunities
            </h2>
            <div className="flex flex-wrap gap-2">
              {prog.careerOpportunities.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-[#0f172a]"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#4eafc4]" />
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          {prog.faq.length > 0 && (
            <section className="mb-10 sm:mb-12 bg-white rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#e8f4f7] flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#4eafc4]" />
                </div>
                <div>
                  <h2
                    className="text-[#0f1e35]"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.15rem, 3vw, 1.35rem)",
                    }}
                  >
                    Frequently Asked Questions
                  </h2>
                  <p className="text-[#64788f] text-xs">
                    Common questions about this program
                  </p>
                </div>
              </div>
              <div className="space-y-4 divide-y divide-gray-100">
                {prog.faq.map((item, idx) => (
                  <details key={idx} className="group pt-4 first:pt-0">
                    <summary className="flex items-start gap-3 cursor-pointer list-none text-[#0f1e35] font-semibold text-sm hover:text-[#4eafc4] transition-colors">
                      <span className="w-6 h-6 rounded-full bg-[#e8f4f7] flex items-center justify-center text-[#4eafc4] text-xs font-bold shrink-0 mt-0.5 group-open:bg-[#4eafc4] group-open:text-white transition-colors">
                        {idx + 1}
                      </span>
                      {item.question}
                    </summary>
                    <p className="mt-3 mb-2 text-[#64788f] text-sm leading-relaxed pl-9">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Programs */}
          {related.length > 0 && (
            <section className="border-t border-gray-200 pt-10">
              <h2
                className="text-[#0f1e35] mb-5"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.2rem, 3vw, 1.3rem)",
                }}
              >
                Related Programs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) =>
                  r ? (
                    <Link
                      key={r.slug}
                      href={`/programs/${r.slug}`}
                      className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3.5 hover:border-[#4eafc4]/40 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#f0f7fa] flex items-center justify-center shrink-0 group-hover:bg-[#4eafc4]/10 transition-colors">
                        <BookOpen className="w-4 h-4 text-[#4eafc4]" />
                      </div>
                      <span className="text-[#0f172a] text-sm font-medium group-hover:text-[#4eafc4] transition-colors">
                        {r.title}
                      </span>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* AI Disclosure */}
          <div className="mt-10 sm:mt-12 flex items-start sm:items-center gap-2 text-xs text-[#64788f] bg-[#eef3f7] rounded-xl px-4 sm:px-5 py-4">
            <Sparkles className="w-4 h-4 text-[#4eafc4] shrink-0" />
            <span>
              This program information is provided by{" "}
              <strong>Virtual University of Pakistan (VU)</strong>.
              For official details, visit the{" "}
              <a
                href="https://www.vu.edu.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4eafc4] hover:underline font-medium"
              >
                official VU website
              </a>
              .
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
