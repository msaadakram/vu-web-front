"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  UploadCloud,
  FileText,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { apiUpload, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { generateBlog, getResourceBlog, type ApiBlog } from "@/lib/blog";

const TYPES = [
  { value: "auto", label: "Auto-detect by AI" },
  { value: "assignment", label: "Assignment" },
  { value: "handout", label: "Handout" },
  { value: "notes", label: "Notes" },
  { value: "other", label: "Other" },
];

const ALLOWED_EXT = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "zip",
  "txt",
  "png",
  "jpg",
  "jpeg",
];
const MAX_SIZE = 50 * 1024 * 1024;
const POLL_INTERVAL = 2500;
const MAX_POLL_MS = 180_000; // 3 minutes

function formatBytes(b: number) {
  if (!b) return "0 B";
  const u = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(1024));
  return `${(b / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${u[i]}`;
}

export default function UploadPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("auto");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [genBlog, setGenBlog] = useState(true);

  // Blog generation polling state
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState("");
  const [resourceId, setResourceId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login?next=/upload");
  }, [authLoading, user, router]);

  const validateFile = (f: File): string | null => {
    const ext = f.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXT.includes(ext)) return `File type .${ext} is not allowed`;
    if (f.size > MAX_SIZE) return "File exceeds 50 MB limit";
    return null;
  };

  const pickFile = (f: File | undefined) => {
    if (!f) return;
    const err = validateFile(f);
    if (err) {
      toast.error(err);
      return;
    }
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  // Poll for blog generation completion
  const pollBlog = useCallback(
    async (resId: string, startTime: number) => {
      try {
        const res = await getResourceBlog(resId);
        const blog = res.data.blog;

        if (blog.status === "published" && blog.slug) {
          setGenerating(false);
          toast.success("SEO article ready!");
          router.push(`/blog/${blog.slug}`);
          return;
        }

        if (blog.status === "failed") {
          setGenerating(false);
          toast.error(
            blog.errorMessage || "AI article generation failed. You can view the resource."
          );
          router.push("/resources");
          return;
        }

        // Still generating — check timeout
        if (Date.now() - startTime > MAX_POLL_MS) {
          setGenerating(false);
          toast.error(
            "Article generation is taking longer than expected. The resource is ready."
          );
          router.push("/resources");
          return;
        }

        // Poll again
        setTimeout(() => pollBlog(resId, startTime), POLL_INTERVAL);
      } catch {
        // Blog not found yet (still creating) — keep polling
        if (Date.now() - startTime > MAX_POLL_MS) {
          setGenerating(false);
          toast.error("Timed out waiting for article. The resource is ready.");
          router.push("/resources");
          return;
        }
        setTimeout(() => pollBlog(resId, startTime), POLL_INTERVAL);
      }
    },
    [router]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("type", type);
    if (description.trim()) formData.append("description", description.trim());
    if (course.trim()) formData.append("course", course.trim());
    if (semester.trim()) formData.append("semester", semester.trim());
    formData.append("file", file);

    try {
      const uploadRes = await apiUpload<{
        data: { resource: { _id: string } };
      }>("/resources", formData);
      const resId = uploadRes.data.resource._id;

      if (!genBlog) {
        toast.success("Resource uploaded successfully");
        router.push("/resources");
        return;
      }

      // Trigger blog generation
      setResourceId(resId);
      setGenerating(true);
      setGenProgress("Starting AI article generation...");

      try {
        await generateBlog(resId);
        setGenProgress("Writing SEO-optimized article...");
        // Start polling
        setTimeout(() => pollBlog(resId, Date.now()), POLL_INTERVAL);
      } catch (err) {
        setGenerating(false);
        const message =
          err instanceof ApiError ? err.message : "Failed to start article generation";
        toast.error(message + ". The resource is ready.");
        router.push("/resources");
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Upload failed";
      toast.error(message);
      setSubmitting(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#4eafc4]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Share with the community
            </span>
            <h1
              className="text-white mb-3"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                lineHeight: 1.2,
              }}
            >
              Upload a Resource
            </h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Share assignments, handouts, and notes. Files are
              stored securely on Cloudflare R2.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path
              d="M0 50L1440 50L1440 15C1200 50 960 0 720 25C480 50 240 0 0 15Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-[#1c3557]/8 p-8 shadow-sm space-y-6"
        >
          {/* File drop zone */}
          <div>
            <label className="block text-sm font-medium text-[#0f1e35] mb-2">
              File
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-[#4eafc4] bg-[#e8f4f7]/50"
                  : "border-[#1c3557]/15 hover:border-[#4eafc4] hover:bg-[#f8fafc]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt,.png,.jpg,.jpeg"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
              {file ? (
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f4f7] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#4eafc4]" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[#0f1e35] truncate max-w-xs">
                      {file.name}
                    </div>
                    <div className="text-xs text-[#64788f]">
                      {formatBytes(file.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="p-1.5 rounded-lg text-[#64788f] hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <UploadCloud className="w-10 h-10 text-[#4eafc4]/50 mx-auto mb-3" />
                  <p className="text-[#0f1e35] font-medium text-sm">
                    Drop file here or click to browse
                  </p>
                  <p className="text-[#64788f] text-xs mt-1">
                    PDF, DOC, PPT, XLS, ZIP, TXT, PNG, JPG · max 50 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#0f1e35] mb-2">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Data Structures Final 2023"
              className="h-11"
              required
            />
          </div>

          {/* Type + Course + Semester */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0f1e35] mb-2">
                Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f1e35] mb-2">
                Course
              </label>
              <Input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="e.g. CS301"
                className="h-11"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f1e35] mb-2">
                Semester
              </label>
              <Input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. Fall 2023"
                className="h-11"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#0f1e35] mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe this resource..."
              rows={3}
              className="w-full px-3 py-2 bg-[#eef3f7] border border-input rounded-md text-[#0f1e35] placeholder:text-[#64788f] outline-none focus:ring-2 focus:ring-[#4eafc4]/30 focus:border-[#4eafc4] resize-none text-sm"
            />
          </div>

          {/* Generate SEO Blog toggle */}
          <div className="flex items-center gap-3 p-4 bg-[#e8f4f7]/40 rounded-xl border border-[#4eafc4]/15">
            <Sparkles className="w-5 h-5 text-[#4eafc4] shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-sm font-semibold text-[#0f1e35] block">
                Generate SEO Article
              </label>
              <p className="text-xs text-[#64788f]">
                Auto-write a complete, SEO-optimized blog post about this
                course topic
              </p>
            </div>
            <Switch checked={genBlog} onCheckedChange={setGenBlog} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 px-6 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/40 transition-shadow"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Upload Resource <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/resources")}
              className="h-11 px-6"
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      </div>

      {/* Generation overlay with continue option */}
      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4eafc4] to-[#1c3557] flex items-center justify-center mx-auto mb-5">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h3 className="text-[#0f1e35] font-semibold text-lg mb-2">
                Writing Your SEO Article
              </h3>
              <p className="text-[#64788f] text-sm mb-3">
                Our AI is crafting a comprehensive, SEO-optimized blog post
                about this course topic. This may take a moment.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-[#4eafc4] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4eafc4] animate-pulse" />
                {genProgress}
              </div>
              <div className="mt-6 flex flex-col gap-2 text-left text-xs text-[#64788f] bg-[#f8fafc] rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  Resource uploaded successfully
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#4eafc4] border-t-transparent animate-spin" />
                  AI generating SEO blog content...
                </div>
              </div>

              {/* Continue browsing option */}
              <div className="mt-6 pt-5 border-t border-[#1c3557]/8">
                <p className="text-xs text-[#64788f] mb-3">
                  You don&apos;t need to wait — we&apos;ll finish in the background.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setGenerating(false);
                      toast.success("Blog will be ready soon! Check the resource page.");
                      router.push("/resources");
                    }}
                    className="flex-1 px-4 py-2.5 border border-[#1c3557]/15 text-[#0f1e35] rounded-xl text-sm font-medium hover:bg-[#eef3f7] transition-colors"
                  >
                    Browse Resources
                  </button>
                  <button
                    onClick={() => {
                      setGenerating(false);
                      router.push("/");
                    }}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
