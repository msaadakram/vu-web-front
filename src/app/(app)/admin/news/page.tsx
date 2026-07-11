"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { getNewsById } from "@/lib/blog";

const CATEGORIES = [
  "General",
  "News",
  "Announcements",
  "Events",
  "Academics",
  "Research",
];

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/jpg",
];

export default function AdminCreateNews() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [tagsInput, setTagsInput] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState<"form" | "generating" | "done">("form");
  const pollRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Cleanup: revoke object URL and clear interval on unmount
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pollForCompletion = useCallback(
    (postId: string, startTime: number) => {
      const POLL_INTERVAL = 2500;
      const MAX_POLL_MS = 180_000;

      pollRef.current = setInterval(async () => {
        try {
          const res = await getNewsById(postId);
          const blog = res.data.blog;

          if (blog.status === "published" && blog.slug) {
            clearInterval(pollRef.current);
            setStep("done");
            setGenerating(false);
            toast.success("Article published!");
            router.push(`/news/${blog.slug}`);
            return;
          }

          if (blog.status === "failed") {
            clearInterval(pollRef.current);
            setStep("form");
            setGenerating(false);
            toast.error("Generation failed. Try again.");
            return;
          }

          if (Date.now() - startTime > MAX_POLL_MS) {
            clearInterval(pollRef.current);
            setStep("form");
            setGenerating(false);
            toast.error("Timed out. Check the dashboard.");
            return;
          }
        } catch {
          if (Date.now() - startTime > MAX_POLL_MS) {
            clearInterval(pollRef.current);
            setStep("form");
            setGenerating(false);
            toast.error("Timed out waiting for generation.");
          }
        }
      }, POLL_INTERVAL);
    },
    [router]
  );

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please select a PNG, JPEG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB");
      return;
    }

    // Revoke previous preview URL before creating a new one
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverFile(null);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setGenerating(true);
    setStep("generating");

    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // 1. Create draft with form data (supports cover image upload)
      const formData = new FormData();
      formData.append("title", title.trim());
      if (description.trim()) formData.append("description", description.trim());
      formData.append("category", category);
      tags.forEach((t) => formData.append("tags", t));
      if (coverFile) formData.append("coverImage", coverFile);

      const draftRes = await fetch("/api/news/draft", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vu_token")}`,
        },
        body: formData,
      });

      if (!draftRes.ok) {
        const data = await draftRes.json().catch(() => null);
        throw new Error(data?.message || "Failed to create draft");
      }

      const draftData = await draftRes.json();
      const postId = draftData.data.blog._id;

      // 2. Trigger generation
      await api(`/news/${postId}/generate`, {
        method: "POST",
        body: { description: description.trim() },
      });

      // 3. Poll for completion using typed helper
      pollForCompletion(postId, Date.now());
    } catch (err) {
      setGenerating(false);
      setStep("form");
      toast.error(
        err instanceof Error ? err.message : "Failed to create article"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] pt-20 lg:pt-[72px] pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4eafc4]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#4eafc4] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </span>
            <h1
              className="text-white text-2xl lg:text-3xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-playfair), serif",
              }}
            >
              Create News Article
            </h1>
            <p className="text-white/50 text-sm">
              Provide a title and optional details. Our AI will generate a
              complete, well-structured article.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 -mt-6 relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-8"
        >
          {step === "generating" ? (
            <div className="text-center py-16">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e8f4f7] to-[#d1edf2] flex items-center justify-center mx-auto mb-5"
              >
                <Sparkles className="w-8 h-8 text-[#4eafc4]" />
              </motion.div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-2">
                Generating Article
              </h3>
              <p className="text-[#64788b] text-sm max-w-sm mx-auto">
                Our AI is writing a comprehensive, SEO-optimized article based
                on your title. This usually takes 30–60 seconds.
              </p>
              <div className="mt-6 w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 bg-gradient-to-r from-[#4eafc4] to-[#2dd4bf] rounded-full"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#94a3b8]">
                <Loader2 className="w-3 h-3 animate-spin" />
                Structuring sections · writing FAQs · optimizing for search
              </div>
            </div>
          ) : step === "done" ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-[#0f172a] font-semibold text-lg mb-1">
                Article Published!
              </h3>
              <p className="text-[#64788b] text-sm">
                Redirecting you to the article...
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-[#0f172a] text-sm font-semibold mb-1.5">
                  Cover Image
                </label>
                {coverPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeCover}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#4eafc4] hover:bg-[#f8fafc] transition-all">
                    <Upload className="w-6 h-6 text-[#94a3b8] mb-2" />
                    <span className="text-sm text-[#94a3b8] font-medium">
                      Upload cover image
                    </span>
                    <span className="text-[10px] text-[#b0c8d4] mt-1">
                      PNG, JPEG or WebP (max 5 MB)
                    </span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      onChange={handleCoverSelect}
                      className="hidden"
                      disabled={generating}
                    />
                  </label>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-[#0f172a] text-sm font-semibold mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., New Academic Programs Announced for 2026"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#4eafc4] focus:ring-2 focus:ring-[#4eafc4]/20 transition-all text-sm"
                  required
                  disabled={generating}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#0f172a] text-sm font-semibold mb-1.5">
                  Description / Context
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional: provide additional context or key points the article should cover..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#4eafc4] focus:ring-2 focus:ring-[#4eafc4]/20 transition-all text-sm resize-none"
                  disabled={generating}
                />
              </div>

              {/* Category + Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#0f172a] text-sm font-semibold mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[#0f172a] outline-none focus:border-[#4eafc4] focus:ring-2 focus:ring-[#4eafc4]/20 transition-all text-sm appearance-none"
                    disabled={generating}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#0f172a] text-sm font-semibold mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g., admissions, 2026, programs"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#4eafc4] focus:ring-2 focus:ring-[#4eafc4]/20 transition-all text-sm"
                    disabled={generating}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={generating || !title.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-xl text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
