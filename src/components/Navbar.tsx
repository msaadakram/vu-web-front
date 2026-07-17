"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Menu, X, Upload, LogOut,
  Library, Sparkles, ChevronDown, BookOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/fee-structure", label: "Fee" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/ai-chat", label: "AI Chat" },
  { href: "/about", label: "About" },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isChat = pathname === "/ai-chat";
    const handler = () => setScrolled(window.scrollY > 40 || isChat);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/resources?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-2xl shadow-[0_4px_32px_rgba(28,53,87,0.08)] border-b border-[#1c3557]/6"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative w-9 h-9 lg:w-10 lg:h-10 overflow-hidden rounded-xl shadow-lg"
              >
                <Image src="/facon.png" alt="VirtualU" fill className="object-cover" />
              </motion.div>
              <div>
                <span
                  className={`block font-bold leading-none transition-colors duration-300 ${
                    scrolled || mobileOpen ? "text-[#1c3557]" : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem" }}
                >
                  VirtualU
                </span>
                <span className="block text-[#4eafc4] text-[10px] lg:text-xs font-semibold tracking-[0.18em] uppercase">
                  University
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      active
                        ? "text-[#4eafc4]"
                        : scrolled || mobileOpen
                          ? "text-[#1c3557]/75 hover:text-[#1c3557]"
                          : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                      active
                        ? "opacity-100 bg-[#4eafc4]/8"
                        : "opacity-0 group-hover:opacity-100 " + (scrolled || mobileOpen ? "bg-[#f0f7fa]" : "bg-white/8")
                    }`} />
                    <span className="relative">{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#4eafc4]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setSearchOpen((v) => !v)}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  scrolled || mobileOpen
                    ? "text-[#1c3557]/60 hover:bg-[#f0f7fa] hover:text-[#4eafc4]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                aria-label="Toggle search"
              >
                <Search className="w-[17px] h-[17px]" />
              </motion.button>

              {loading ? null : user ? (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/upload"
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/45 transition-all duration-300"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Upload</span>
                    </Link>
                  </motion.div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center gap-2 px-2 py-1.5 rounded-full border transition-all duration-200 ${
                        scrolled || mobileOpen ? "border-[#1c3557]/10 hover:bg-[#f0f7fa]" : "border-white/15 hover:bg-white/10"
                      }`}>
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1c3557] to-[#4eafc4] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {initials(user.name)}
                        </span>
                        <span className={`text-xs font-semibold hidden lg:block ${
                          scrolled || mobileOpen ? "text-[#1c3557]" : "text-white"
                        }`}>{user.name.split(" ")[0]}</span>
                        <ChevronDown className={`w-3 h-3 hidden lg:block ${
                          scrolled || mobileOpen ? "text-[#1c3557]/40" : "text-white/40"
                        }`} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border-[#1c3557]/8 p-1.5">
                      <DropdownMenuLabel className="font-normal px-3 py-2">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1c3557] to-[#4eafc4] text-white flex items-center justify-center text-xs font-bold">{initials(user.name)}</span>
                          <div>
                            <p className="text-sm font-semibold text-[#0f1e35]">{user.name}</p>
                            <p className="text-xs text-[#64788f] truncate max-w-[130px]">{user.email}</p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-1" />
                      {user.role === "admin" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer rounded-xl flex items-center gap-2 px-3 py-2.5">
                            <Sparkles className="w-4 h-4 text-[#4eafc4]" /> Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/upload" className="cursor-pointer rounded-xl flex items-center gap-2 px-3 py-2.5">
                          <Upload className="w-4 h-4 text-[#64788f]" /> Upload Resource
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/resources" className="cursor-pointer rounded-xl flex items-center gap-2 px-3 py-2.5">
                          <Library className="w-4 h-4 text-[#64788f]" /> Browse Resources
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem onClick={onLogout} className="cursor-pointer rounded-xl flex items-center gap-2 px-3 py-2.5 text-red-500 focus:text-red-500 focus:bg-red-50">
                        <LogOut className="w-4 h-4" /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      scrolled || mobileOpen ? "text-[#1c3557]/75 hover:bg-[#f0f7fa] hover:text-[#1c3557]" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/register"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/45 transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile: search + burger */}
            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className={`p-2.5 rounded-xl transition-colors ${
                  scrolled || mobileOpen ? "text-[#1c3557]/70 hover:bg-[#f0f7fa]" : "text-white/80 hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2.5 rounded-xl transition-colors ${
                  scrolled || mobileOpen ? "text-[#1c3557] hover:bg-[#f0f7fa]" : "text-white/90 hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop Search Panel */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-white/98 backdrop-blur-2xl border-t border-[#1c3557]/6 overflow-hidden hidden md:block"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-6 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64788f]" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources, courses, handouts..."
                    className="w-full pl-11 pr-14 py-3 bg-[#f0f7fa] rounded-2xl text-[#0f1e35] placeholder:text-[#64788f]/60 outline-none focus:ring-2 focus:ring-[#4eafc4]/30 focus:bg-white text-sm transition-all"
                  />
                  <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#64788f]/50 bg-[#e8edf2] px-2 py-0.5 rounded-md font-mono">Enter</kbd>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-2xl border-b border-[#1c3557]/6 px-4 py-3 shadow-lg"
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64788f]" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-11 pr-4 py-3 bg-[#f0f7fa] rounded-2xl text-[#0f1e35] placeholder:text-[#64788f]/60 outline-none focus:ring-2 focus:ring-[#4eafc4]/30 text-sm"
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0f1e35]/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-[340px] bg-white flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-[#1c3557]/6">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                    <Image src="/facon.png" alt="VirtualU" fill className="object-cover" />
                  </div>
                  <span className="font-bold text-[#1c3557]" style={{ fontFamily: "var(--font-playfair), serif" }}>VirtualU</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-[#f0f7fa] text-[#64788f]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                          active
                            ? "bg-gradient-to-r from-[#e8f4f7] to-[#f0fafb] text-[#4eafc4] shadow-sm"
                            : "text-[#1c3557] hover:bg-[#f8fafb]"
                        }`}
                      >
                        {link.label}
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-[#4eafc4]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile bottom actions */}
              <div className="px-4 py-5 border-t border-[#1c3557]/6 space-y-2.5">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-3 bg-[#f8fafb] rounded-xl mb-3">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1c3557] to-[#4eafc4] text-white flex items-center justify-center text-xs font-bold">{initials(user.name)}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#0f1e35]">{user.name}</p>
                        <p className="text-xs text-[#64788f]">{user.role}</p>
                      </div>
                    </div>
                    <Link href="/upload" onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-2xl font-semibold text-sm shadow-lg">
                      <Upload className="w-4 h-4" /> Upload Resource
                    </Link>
                    <button onClick={() => { setMobileOpen(false); onLogout(); }}
                      className="flex items-center justify-center gap-2 w-full px-5 py-3.5 border border-red-100 bg-red-50 text-red-500 rounded-2xl font-semibold text-sm">
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}
                      className="block text-center w-full px-5 py-3.5 border-2 border-[#1c3557]/10 text-[#1c3557] rounded-2xl font-semibold text-sm hover:bg-[#f0f7fa] transition-colors">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)}
                      className="block text-center w-full px-5 py-3.5 bg-gradient-to-r from-[#4eafc4] to-[#2a8aa3] text-white rounded-2xl font-semibold text-sm shadow-lg">
                      Sign Up Free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
