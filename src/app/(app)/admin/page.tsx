"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Plus,
  FileText,
  ExternalLink,
  Trash2,
  RefreshCw,
  Sparkles,
  Upload,
  Download,
} from "lucide-react";
import { api, ApiResource } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatFileSize, formatDate, RESOURCE_TYPE_META } from "@/lib/resources";

type BlogEntry = {
  _id: string;
  title: string;
  slug: string;
  type: "resource" | "news";
  status: "generating" | "published" | "failed";
  category: string;
  createdAt: string;
  errorMessage?: string;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"all" | "news" | "resource" | "uploads">("all");
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [resources, setResources] = useState<ApiResource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, resourceRes] = await Promise.all([
        api<{
          status: string;
          data: { blogs: BlogEntry[]; categories: string[] };
        }>("/blog?limit=50"),
        api<{ status: string; data: { resources: ApiResource[] } }>(
          "/resources"
        ),
      ]);

      setBlogs(blogRes.data.blogs || []);
      setResources(resourceRes.data.resources || []);
    } catch {
      setBlogs([]);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await api(`/blog/${id}/delete`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm("Delete this resource permanently?")) return;
    try {
      await api(`/resources/${id}`, { method: "DELETE" });
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const content =
    tab === "uploads" ? resources : tab === "all" ? [...blogs] : tab === "news" ? blogs.filter((b) => b.type === "news") : blogs.filter((b) => b.type === "resource");

  const statusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-semibold">
            Published
          </span>
        );
      case "generating":
        return (
          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-semibold flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" />
            Generating
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-[10px] font-semibold">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] pt-20 lg:pt-[72px] pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-wider uppercase mb-3"
              >
                <Sparkles className="w-3 h-3" />
                Admin Panel
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-white text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/50 text-sm mt-1"
              >
                Manage content, resources, and news articles
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="flex gap-3"
            >
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload Resource
              </Link>
              <Link
                href="/admin/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/40 transition-all"
              >
                <Plus className="w-4 h-4" />
                New Article
              </Link>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mt-8 overflow-x-auto"
          >
            {[
              { key: "all" as const, label: "All Content" },
              { key: "news" as const, label: "News" },
              { key: "resource" as const, label: "Blog Articles" },
              { key: "uploads" as const, label: "Resource Uploads" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  tab === t.key
                    ? "bg-white text-[#0f1e35] shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {t.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center text-[#94a3b8] text-sm">
              Loading...
            </div>
          ) : tab !== "uploads" ? (
            content.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
                <p className="text-[#64788b] text-sm">
                  No content found in this category.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {(content as BlogEntry[]).map((blog, i) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            blog.type === "news"
                              ? "text-[#4eafc4]"
                              : "text-purple-500"
                          }`}
                        >
                          {blog.type}
                        </span>
                        {statusBadge(blog.status)}
                        <span className="text-[#94a3b8] text-[10px]">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#0f172a] text-sm font-medium truncate">
                        {blog.title}
                      </p>
                      {blog.status === "failed" && blog.errorMessage && (
                        <p className="text-red-500 text-[10px] mt-0.5 truncate">
                          {blog.errorMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {blog.status === "published" && (
                        <Link
                          href={
                            blog.type === "news"
                              ? `/news/${blog.slug}`
                              : `/blog/${blog.slug}`
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 text-[#64788b] hover:text-[#4eafc4] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      {blog.status === "failed" && (
                        <button
                          onClick={async () => {
                            try {
                              await api(`/blog/${blog._id}/retry`, { method: "POST" });
                              fetchData();
                            } catch {
                              alert("Failed to retry");
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 text-[#64788b] hover:text-amber-500 transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-[#64788b] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : resources.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
              <p className="text-[#64788b] text-sm">
                No resources uploaded yet.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#4eafc4] text-white rounded-lg text-sm font-medium hover:bg-[#3a95aa] transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload a Resource
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {resources.map((r, i) => {
                const meta = RESOURCE_TYPE_META[r.type] || { icon: "📄", badge: "bg-gray-100 text-gray-700" };
                return (
                  <motion.div
                    key={r._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#e8f4f7] flex items-center justify-center text-base shrink-0">
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${meta.badge}`}>
                          {meta.label}
                        </span>
                        {r.course && (
                          <span className="text-[10px] font-bold text-[#4eafc4]">
                            {r.course}
                          </span>
                        )}
                        <span className="text-[#94a3b8] text-[10px]">
                          {formatFileSize(r.file.size)}
                        </span>
                      </div>
                      <p className="text-[#0f172a] text-sm font-medium truncate">
                        {r.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`/api/resources/${r._id}/download`}
                        className="p-2 rounded-lg hover:bg-gray-100 text-[#64788b] hover:text-[#4eafc4] transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteResource(r._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-[#64788b] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
