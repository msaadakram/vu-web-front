"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Menu,
  X,
  GraduationCap,
  Upload,
  LogOut,
  User as UserIcon,
  BookOpen,
  Library,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/fee-structure", label: "Fee Structure" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onLogout = () => {
    logout();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-navy/5 border-b border-navy/8"
            : "bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-[#4eafc4] to-[#1c3557] flex items-center justify-center shadow-lg group-hover:shadow-[#4eafc4]/30 transition-all duration-300">
                <GraduationCap className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <span
                  className={`block font-bold leading-none transition-colors duration-300 ${
                    scrolled ? "text-[#1c3557]" : "text-white"
                  }`}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                  }}
                >
                  VirtualU
                </span>
                <span className="block text-[#4eafc4] text-[10px] lg:text-xs font-medium tracking-[0.15em] uppercase">
                  University
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-[#4eafc4]"
                        : scrolled
                          ? "text-[#1c3557]/80 hover:text-[#4eafc4]"
                          : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#4eafc4]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-lg transition-colors duration-200 ${
                  scrolled
                    ? "text-[#1c3557]/70 hover:bg-[#e8f4f7]"
                    : "text-white/80 hover:bg-white/10"
                }`}
                aria-label="Toggle search"
              >
                <Search className="w-[18px] h-[18px]" />
              </motion.button>

              {loading ? null : user ? (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/upload"
                      className="flex items-center gap-2 px-4 lg:px-5 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/40 transition-all duration-300"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden lg:inline">Upload</span>
                    </Link>
                  </motion.div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-[#1c3557]/10 hover:bg-[#e8f4f7]/70 transition-all duration-200">
                        <span className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-[#1c3557] to-[#4eafc4] text-white flex items-center justify-center text-[10px] lg:text-xs font-bold">
                          {initials(user.name)}
                        </span>
                        <span
                          className={`text-sm font-medium hidden lg:block transition-colors duration-300 ${
                            scrolled ? "text-[#1c3557]" : "text-white"
                          }`}
                        >
                          {user.name.split(" ")[0]}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm font-medium leading-none">
                            {user.name}
                          </span>
                          <span className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </span>
                          {user.role === "admin" && (
                            <span className="text-[10px] font-semibold text-[#4eafc4] uppercase tracking-wider mt-1">
                              Admin
                            </span>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {user.role === "admin" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer">
                              <Sparkles className="w-4 h-4 mr-2" /> Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                          <DropdownMenuItem asChild>
                        <Link href="/upload" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" /> Upload Resource
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/resources" className="cursor-pointer">
                          <Library className="w-4 h-4 mr-2" /> Browse Resources
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={onLogout}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      scrolled
                        ? "text-[#1c3557]/80 hover:bg-[#e8f4f7]"
                        : "text-white/85 hover:bg-white/10"
                    }`}
                  >
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/register"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4eafc4]/25 hover:shadow-[#4eafc4]/40 transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled || mobileOpen
                  ? "text-[#1c3557] hover:bg-[#eef3f7]"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-xl border-t border-[#1c3557]/8 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64788f]" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources, courses..."
                    className="w-full pl-11 pr-4 py-3 bg-[#eef3f7] rounded-xl text-[#0f1e35] placeholder:text-[#64788f] outline-none focus:ring-2 focus:ring-[#4eafc4]/30 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(
                          `/resources?q=${encodeURIComponent(searchQuery)}`
                        );
                        setSearchOpen(false);
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col pt-20 px-5 sm:px-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-5 py-3.5 rounded-xl text-base font-medium transition-colors ${
                          active
                            ? "bg-[#e8f4f7] text-[#4eafc4]"
                            : "text-[#1c3557] hover:bg-[#eef3f7]"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-auto py-8"
              >
                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/upload"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-2xl font-semibold text-base shadow-lg"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Resource
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        onLogout();
                      }}
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-[#1c3557]/10 text-[#1c3557] rounded-2xl font-semibold text-base"
                    >
                      <LogOut className="w-5 h-5" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-6 py-4 border-2 border-[#1c3557]/10 text-[#1c3557] rounded-2xl font-semibold text-base hover:bg-[#eef3f7] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-6 py-4 bg-gradient-to-r from-[#4eafc4] to-[#3a95aa] text-white rounded-2xl font-semibold text-base shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
