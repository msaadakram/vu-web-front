"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trash2, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { api, type ApiResource } from "@/lib/api";
import {
  RESOURCE_TYPE_META,
  formatFileSize,
  formatDate,
  uploaderName,
  isOwnedBy,
} from "@/lib/resources";
import { useAuth } from "@/lib/auth";
import { DownloadButton } from "@/components/DownloadButton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ResourceCard({ resource, index }: { resource: ApiResource; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const meta = RESOURCE_TYPE_META[resource.type];
  const canDelete = isOwnedBy(resource, user?.id) || user?.role === "admin";

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
      className="group bg-white rounded-2xl border border-[#1c3557]/8 p-5 sm:p-6 hover:shadow-xl hover:shadow-[#1c3557]/6 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#e8f4f7] flex items-center justify-center text-lg shrink-0">
            {meta.icon}
          </div>
          <div className="min-w-0">
            {resource.course && (
              <span className="text-[#4eafc4] font-bold text-sm truncate block">{resource.course}</span>
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
        <DownloadButton
          resourceId={resource._id}
          fileName={resource.file.originalName}
          className="flex-1 py-2.5"
        />

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
