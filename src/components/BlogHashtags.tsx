"use client";
import Link from "next/link";
import { Hash, TrendingUp } from "lucide-react";
import { matchHashtags, getTopHashtags, type SeoHashtag } from "@/lib/seo-hashtags";

interface BlogHashtagsProps {
  tags?: string[];
  keywords?: string[];
  /** Show only top N by volume from matched tags */
  maxTags?: number;
  /** If true, also append globally trending tags not already in the list */
  appendTrending?: boolean;
  variant?: "pill" | "inline";
}

export function BlogHashtags({
  tags = [],
  keywords = [],
  maxTags = 12,
  appendTrending = true,
  variant = "pill",
}: BlogHashtagsProps) {
  const matched = matchHashtags(tags, keywords);

  // Append top global tags not already matched
  if (appendTrending) {
    const matchedSlugs = new Set(matched.map((h) => h.slug));
    const trending = getTopHashtags(6).filter((h) => !matchedSlugs.has(h.slug));
    matched.push(...trending);
  }

  // Deduplicate and limit
  const seen = new Set<string>();
  const displayed: SeoHashtag[] = [];
  for (const h of matched) {
    if (!seen.has(h.slug)) {
      seen.add(h.slug);
      displayed.push(h);
    }
    if (displayed.length >= maxTags) break;
  }

  if (displayed.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {displayed.map((h) => (
          <Link
            key={h.slug}
            href={`/blog/tag/${h.slug}`}
            className="text-[#4eafc4] text-xs font-semibold hover:underline transition-colors"
          >
            #{h.tag.replace(/ /g, "")}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[#e8f4f7] flex items-center justify-center">
          <Hash className="w-3.5 h-3.5 text-[#4eafc4]" />
        </div>
        <span className="text-xs font-bold text-[#64788b] uppercase tracking-wider">SEO Tags</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-[#94a3b8]">
          <TrendingUp className="w-3 h-3" /> Keyword Optimized
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {displayed.map((h) => (
          <Link
            key={h.slug}
            href={`/blog/tag/${h.slug}`}
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 text-[#64788b] rounded-full text-xs font-medium hover:border-[#4eafc4]/50 hover:text-[#4eafc4] hover:bg-[#e8f4f7]/60 transition-all"
            title={`${h.volume.toLocaleString()} monthly searches`}
          >
            <Hash className="w-3 h-3 text-[#4eafc4]/60 group-hover:text-[#4eafc4]" />
            {h.tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
