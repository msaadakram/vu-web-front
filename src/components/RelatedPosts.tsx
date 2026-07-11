"use client";

import Link from "next/link";
import { Clock, ChevronRight, Layers } from "lucide-react";
import { motion } from "motion/react";

type RelatedPost = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  readTime?: string;
  excerpt?: string;
};

const CATEGORY_DOT: Record<string, string> = {
  "Computer Science": "bg-blue-500",
  Mathematics: "bg-violet-500",
  Business: "bg-emerald-500",
  Physics: "bg-orange-500",
  Chemistry: "bg-red-500",
  Economics: "bg-teal-500",
  English: "bg-pink-500",
};

export function RelatedPosts({ posts, currentSlug }: { posts: RelatedPost[]; currentSlug: string }) {
  const filtered = posts.filter(p => p.slug !== currentSlug).slice(0, 4);
  if (!filtered.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#e8f4f7] flex items-center justify-center">
          <Layers className="w-3.5 h-3.5 text-[#4eafc4]" />
        </div>
        <h3 className="text-[#0f172a] font-bold text-sm">Related Articles</h3>
      </div>

      {/* Posts */}
      <div className="p-2">
        {filtered.map((post, i) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ duration: 0.18 }}
              className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[#f4f7fa] transition-colors group"
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[7px] ${CATEGORY_DOT[post.category] || "bg-gray-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[#0f172a] text-xs font-semibold leading-snug line-clamp-2 group-hover:text-[#4eafc4] transition-colors mb-1">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-[#94a3b8]">
                  <span>{post.category}</span>
                  {post.readTime && (
                    <><span>·</span><span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{post.readTime}</span></>
                  )}
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8] shrink-0 mt-1 group-hover:text-[#4eafc4] transition-colors" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* View all */}
      <div className="px-5 pb-4 pt-1">
        <Link
          href="/blog"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-gray-100 text-[#4eafc4] text-xs font-semibold hover:bg-[#e8f4f7] hover:border-[#4eafc4]/30 transition-all"
        >
          View all articles <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
