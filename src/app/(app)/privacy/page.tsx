import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for VirtualU — an independent, community-driven study hub for Virtual University of Pakistan students. Learn how we handle data, cookies, and third-party services.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "16 July 2026";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[#64788f] text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-slate max-w-none text-[#334155] leading-relaxed space-y-6">
          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              About this site
            </h2>
            <p>
              VirtualU (virtualuniversity.app) is an independent, community-driven study hub and is <strong>not affiliated with, endorsed by, or officially connected to</strong> Virtual University of Pakistan (vu.edu.pk) or any of its subsidiaries. For official information about programs, admissions, or records, visit the official VU website.
            </p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Information we collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account data:</strong> name and email address when you register or subscribe to our newsletter.</li>
              <li><strong>Uploaded content:</strong> study resources you choose to upload (assignments, past papers, handouts).</li>
              <li><strong>Usage data:</strong> anonymous analytics such as pages visited and device type, used to improve the site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Cookies & third-party services
            </h2>
            <p>We use the following third-party services that may set cookies or collect limited data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense</strong> — serves advertisements and may use cookies to personalize ads. You can manage ad personalization via Google Ads Settings.</li>
              <li><strong>Analytics</strong> — to understand site usage and improve content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              How we use your data
            </h2>
            <p>We use collected information to provide study resources, send newsletter updates you have opted into, and improve the platform. We do not sell your personal data.</p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Your rights
            </h2>
            <p>You may request access to, correction of, or deletion of your personal data by contacting us. Newsletter subscribers can unsubscribe at any time via the link in each email.</p>
          </section>

          <section>
            <h2 className="text-[#0f1e35] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Contact
            </h2>
            <p>
              Questions about this policy? Email <a href="mailto:hello@virtualuniversity.app" className="text-[#4eafc4] hover:underline">hello@virtualuniversity.app</a> or visit our <Link href="/contact" className="text-[#4eafc4] hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
