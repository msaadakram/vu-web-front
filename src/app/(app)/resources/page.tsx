"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { motion } from "motion/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, FileText, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { api, type ApiResource } from "@/lib/api";
import { RESOURCE_TYPE_META, type ResourceType } from "@/lib/resources";
import { ResourceCard } from "@/components/ResourceCard";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/useDebounce";

type TabKey = "all" | ResourceType;

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "assignment", label: "Assignments" },
  { key: "handout", label: "Handouts" },
  { key: "notes", label: "Notes" },
  { key: "other", label: "Other" },
];

export default function ResourcesPage() {
  return (
    <Suspense fallback={null}>
      <ResourcesContent />
    </Suspense>
  );
}

function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const abortRef = useRef<AbortController | null>(null);

  const [resources, setResources] = useState<ApiResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabKey>((searchParams.get("type") as TabKey) || "all");
  const [course, setCourse] = useState(searchParams.get("course") || "All Courses");
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const debouncedSearch = useDebounce(searchInput, 350);

  // Sync filter state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (tab !== "all") params.set("type", tab);
    if (course !== "All Courses") params.set("course", course);
    if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [tab, course, debouncedSearch, router, pathname]);

  const fetchResources = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (tab !== "all") params.set("type", tab);
      if (course !== "All Courses") params.set("course", course);
      if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());
      const query = params.toString();
      const res = await api<{ data: { resources: ApiResource[] } }>(
        `/resources${query ? `?${query}` : ""}`,
        { signal: controller.signal }
      );
      setResources(res.data.resources);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [tab, course, debouncedSearch]);

  useEffect(() => {
    fetchResources();
    return () => abortRef.current?.abort();
  }, [fetchResources]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setResources((prev) => prev.filter((r) => r._id !== detail));
    };
    window.addEventListener("resource-deleted", handler);
    return () => window.removeEventListener("resource-deleted", handler);
  }, []);

  const courses = ["All Courses", ...Array.from(new Set(resources.map((r) => r.course).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <div className="pt-20 lg:pt-[72px] bg-gradient-to-br from-[#0f1e35] via-[#1c3557] to-[#0e2a44] py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#4eafc4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#2a4a73]/20 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 bg-[#4eafc4]/15 border border-[#4eafc4]/30 text-[#4eafc4] rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
              Assignments · Handouts · Notes
            </span>
            <h1 className="text-white mb-4" style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, fontSize: "clamp(1.9rem, 6vw, 3rem)", lineHeight: 1.2 }}>
              Resource Library
            </h1>
            <p className="text-white/60 max-w-xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base px-2">
              Browse, download, and contribute study materials shared by the VirtualU community.
            </p>

            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title, course, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/40 outline-none focus:border-[#4eafc4] focus:bg-white/15 transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path d="M0 50L1440 50L1440 15C1200 50 960 0 720 25C480 50 240 0 0 15Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        {authLoading ? (
          <GridSkeleton />
        ) : (
          <>
            {/* Filter controls */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#1c3557]/8 p-4 sm:p-5 mb-8 shadow-sm flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
                  <TabsList className="flex flex-wrap h-auto bg-[#eef3f7] p-1 rounded-xl gap-1 w-full sm:w-auto">
                    {TABS.map((t) => (
                      <TabsTrigger
                        key={t.key}
                        value={t.key}
                        className="data-[state=active]:bg-white data-[state=active]:text-[#4eafc4] data-[state=active]:shadow-sm text-[#64788f] text-xs px-3 py-1.5 rounded-lg font-medium"
                      >
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <div className="relative sm:ml-auto w-full sm:w-auto">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full sm:min-w-[170px] pl-4 pr-9 py-2.5 bg-[#f8fafc] border border-[#1c3557]/10 rounded-xl text-[#0f1e35] text-sm outline-none focus:ring-2 focus:ring-[#4eafc4]/30 appearance-none cursor-pointer"
                  >
                    {courses.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64788f] pointer-events-none" />
                </div>
              </div>

              <div className="text-sm text-[#64788f] whitespace-nowrap">
                <span className="font-semibold text-[#0f1e35]">{resources.length}</span> found
              </div>
            </motion.div>

            {loading ? (
              <GridSkeleton />
            ) : resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {resources.map((r, i) => (
                  <ResourceCard key={r._id} resource={r} index={i} />
                ))}
              </div>
            ) : (
              <EmptyState hasSearch={!!debouncedSearch || course !== "All Courses" || tab !== "all"} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-[#1c3557]/8 p-6 h-64">
          <Skeleton className="h-11 w-11 rounded-xl mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-4" />
          <Skeleton className="h-3 w-full mb-6" />
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="text-center py-24">
      <FileText className="w-14 h-14 text-[#64788f]/20 mx-auto mb-4" />
      <h3 className="text-[#0f1e35] font-semibold mb-2">No resources found</h3>
      <p className="text-[#64788f] text-sm mb-5">
        {hasSearch ? "Try adjusting your filters." : "Be the first to share a resource."}
      </p>
      <Link
        href="/upload"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#4eafc4] text-white rounded-full text-sm font-semibold hover:bg-[#3a95aa] transition-colors"
      >
        Upload Resource <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
