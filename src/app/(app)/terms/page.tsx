import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for VirtualU — an independent, community-driven study hub for Virtual University of Pakistan students. Read the rules for using our platform and uploaded study resources.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const lastUpdated = "16 July 2026";

export default function TermsPage() {
  return (
    <article className="min-h-screen bg-[#f8fafc] pt-24 lg:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block px-3 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Legal
          </span>
          <h1
            className="text-[#0f1e35] mb-3"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}
          >
            Terms of Service
          </h1>
          <p className="text-[#64788f] text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-slate max-w-none text-[#334155] leading-relaxed space-y-6">
          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Not affiliated with VU
            </h2>
            <p>
              VirtualU is an independent study hub and is <strong>not affiliated with, endorsed by, or officially connected to</strong> Virtual University of Pakistan (vu.edu.pk). All references to VU programs, subjects, and admissions are for educational guidance only. Always verify official information on the <a href="https://www.vu.edu.pk" target="_blank" rel="noopener noreferrer" className="text-[#4eafc4] hover:underline">official VU website</a>.
            </p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Use of the platform
            </h2>
            <p>By using VirtualU you agree to use the platform lawfully and not to upload content that infringes the rights of others, is unlawful, or is harmful.</p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              User-uploaded content
            </h2>
            <p>
              Users may upload study resources. You retain ownership of content you upload and grant VirtualU a license to display, organize, and generate study guides from it for the community. You are responsible for ensuring you have the right to upload shared material.
            </p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              AI-generated content
            </h2>
            <p>
              Some articles and study guides are generated with AI assistance from uploaded materials. AI-generated content may contain inaccuracies — treat it as a study aid, not an authoritative source, and confirm important details against official VU materials.
            </p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Disclaimer
            </h2>
            <p>The platform is provided "as is" without warranties. We do not guarantee the accuracy, completeness, or timeliness of any content.</p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Contact
            </h2>
            <p>
              Questions about these terms? Email <a href="mailto:hello@virtualuniversity.app" className="text-[#4eafc4] hover:underline">hello@virtualuniversity.app</a> or visit our <Link href="/contact" className="text-[#4eafc4] hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
