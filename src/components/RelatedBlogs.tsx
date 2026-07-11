import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, Hash } from "lucide-react";

export type RelatedBlogCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  tags?: string[];
  keywords?: string[];
  createdAt?: string;
};

interface RelatedBlogsProps {
  posts: RelatedBlogCard[];
  currentSlug: string;
  title?: string;
}

export function RelatedBlogs({ posts, currentSlug, title = "Related Articles" }: RelatedBlogsProps) {
  const filtered = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (filtered.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16" aria-label="Related articles">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-[#4eafc4]" />
        </div>
        <div>
          <h2
            className="text-[#0f172a] font-bold"
            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.2rem" }}
          >
            {title}
          </h2>
          <p className="text-[#94a3b8] text-xs mt-0.5">Explore more VU study guides</p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#4eafc4]/30 hover:shadow-md transition-all flex flex-col"
          >
            {/* Category badge */}
            {post.category && (
              <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 bg-[#e8f4f7] text-[#3a95aa] rounded-full text-[10px] font-bold uppercase tracking-wide mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4]" />
                {post.category}
              </span>
            )}

            {/* Title */}
            <h3 className="text-[#0f172a] font-semibold text-sm leading-snug mb-2 group-hover:text-[#3a95aa] transition-colors line-clamp-3">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-[#64788b] text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* Tags row */}
            {(post.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(post.tags ?? []).slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-0.5 text-[10px] text-[#4eafc4] font-medium"
                  >
                    <Hash className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
              {post.readTime && (
                <span className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
                  <Clock className="w-3 h-3" />{post.readTime}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-[#4eafc4] font-semibold group-hover:gap-2 transition-all ml-auto">
                Read more <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
