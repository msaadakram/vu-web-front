"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Download, Trash2, FileText, BookOpen, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { api, type ApiResource } from "@/lib/api";
import { getToken } from "@/lib/api";
import {
  RESOURCE_TYPE_META,
  formatFileSize,
  formatDate,
  uploaderName,
  isOwnedBy,
} from "@/lib/resources";
import { useAuth } from "@/lib/auth";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const BASE_URL = "/api";

export function ResourceCard({ resource, index }: { resource: ApiResource; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const meta = RESOURCE_TYPE_META[resource.type];
  const canDelete = isOwnedBy(resource, user?.id) || user?.role === "admin";

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/resources/${resource._id}/download`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Download failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resource.file.originalName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setCompleted(true);
      setTimeout(() => setCompleted(false), 2000);
      toast.success("Download started");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api(`/resources/${resource._id}`, { method: "DELETE" });
      toast.success("Resource deleted");
      window.dispatchEvent(new CustomEvent("resource-deleted", { detail: resource._id }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index % 4}
      className="group bg-white rounded-2xl border border-[#1c3557]/8 p-6 hover:shadow-xl hover:shadow-[#1c3557]/6 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#e8f4f7] flex items-center justify-center text-lg">
            {meta.icon}
          </div>
          <div>
            {resource.course && (
              <span className="text-[#4eafc4] font-bold text-sm">{resource.course}</span>
            )}
            <span className={`block px-2.5 py-0.5 rounded-full text-xs font-medium mt-0.5 w-fit ${meta.badge}`}>
              {meta.label}
            </span>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            className="p-2 rounded-lg text-[#64788f] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? (
              <span className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin block" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <h3
        className="text-[#0f1e35] mb-1 group-hover:text-[#4eafc4] transition-colors line-clamp-2"
        style={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 }}
      >
        {resource.title}
      </h3>

      {resource.description && (
        <p className="text-[#64788f] text-xs mb-3 line-clamp-2">{resource.description}</p>
      )}

      <p className="text-[#64788f] text-xs mb-4">
        {resource.semester ? `${resource.semester} · ` : ""}
        {formatFileSize(resource.file.size)}
      </p>

      <div className="flex items-center gap-2 text-xs text-[#64788f] mb-5 mt-auto pt-4 border-t border-[#1c3557]/5">
        <span className="flex items-center gap-1 truncate">
          <FileText className="w-3 h-3" />
          {resource.file.originalName}
        </span>
        <span className="ml-auto whitespace-nowrap">{formatDate(resource.createdAt)}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 relative flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white hover:shadow-lg hover:shadow-[#4eafc4]/25 transition-all duration-300 disabled:opacity-70 overflow-hidden group/btn"
        >
          {/* Ripple effect on hover */}
          <motion.span
            className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          <AnimatePresence mode="wait">
            {downloading ? (
              <motion.span
                key="downloading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full shrink-0"
                />
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  Downloading
                </motion.span>
              </motion.span>
            ) : completed ? (
              <motion.span
                key="completed"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 relative text-green-200"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
                Downloaded
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 relative"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Download className="w-4 h-4" />
                </motion.div>
                <span className="relative">
                  Download
                  <motion.span
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/60 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {(resource as unknown as { blog?: { slug: string; title: string } }).blog && (
          <Link
            href={`/blog/${(resource as unknown as { blog: { slug: string } }).blog.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold border border-[#4eafc4] text-[#4eafc4] hover:bg-[#e8f4f7] transition-all shrink-0"
          >
            <BookOpen className="w-4 h-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
