import type { ApiResource } from "./api";

export type ResourceType = ApiResource["type"];

export const RESOURCE_TYPE_META: Record<
  ResourceType,
  { label: string; badge: string; icon: string }
> = {
  assignment: {
    label: "Assignment",
    badge: "bg-green-100 text-green-700",
    icon: "📝",
  },
  "past-paper": {
    label: "Past Paper",
    badge: "bg-purple-100 text-purple-700",
    icon: "📄",
  },
  handout: {
    label: "Handout",
    badge: "bg-blue-100 text-blue-700",
    icon: "📘",
  },
  notes: {
    label: "Notes",
    badge: "bg-orange-100 text-orange-700",
    icon: "🗒️",
  },
  other: {
    label: "Other",
    badge: "bg-gray-100 text-gray-700",
    icon: "📎",
  },
};

export function formatFileSize(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function uploaderName(r: ApiResource): string {
  if (typeof r.uploadedBy === "string") return "Unknown";
  return r.uploadedBy.name || "Unknown";
}

export function isOwnedBy(r: ApiResource, userId?: string): boolean {
  const ownerId = typeof r.uploadedBy === "string" ? r.uploadedBy : r.uploadedBy._id;
  return !!userId && ownerId === userId;
}
