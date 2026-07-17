import type { Metadata } from "next";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Virtual University",
  description:
    "Contact VirtualU — an independent study hub for Virtual University of Pakistan students. Email us with questions, feedback, or takedown requests. Not affiliated with vu.edu.pk.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-[#f8fafc] pt-24 lg:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block px-3 py-1.5 bg-[#e8f4f7] text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Contact
          </span>
          <h1
            className="text-[#0f1e35] mb-3"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 2.5rem)" }}
          >
            Contact VirtualU
          </h1>
          <p className="text-[#64788f] leading-relaxed">
            Have a question, feedback, or a takedown request? We&apos;d love to hear from you. Please note VirtualU is an independent, community-driven hub and is not affiliated with Virtual University of Pakistan.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#e8f4f7] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#4eafc4]" />
            </div>
            <div>
              <div className="text-[#94a3b8] text-xs uppercase tracking-wider mb-1">Email</div>
              <a href="mailto:hello@virtualuniversity.app" className="text-[#0f1e35] font-medium hover:text-[#4eafc4] transition-colors break-words">
                hello@virtualuniversity.app
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#e8f4f7] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#4eafc4]" />
            </div>
            <div>
              <div className="text-[#94a3b8] text-xs uppercase tracking-wider mb-1">Location</div>
              <div className="text-[#0f1e35] font-medium">Islamabad, Pakistan</div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100">
            <div className="flex items-start gap-3 text-sm text-[#64788f] bg-amber-50 border border-amber-200/60 rounded-xl p-4">
              <ExternalLink className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Looking for the official Virtual University of Pakistan? Visit{" "}
                <a href="https://www.vu.edu.pk" target="_blank" rel="noopener noreferrer" className="text-[#4eafc4] hover:underline font-medium">
                  vu.edu.pk
                </a>
                . For admissions, LMS login, fee, and exam queries, contact VU directly — VirtualU cannot help with official university matters.
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
