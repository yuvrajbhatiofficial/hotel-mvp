"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, SearchCheck } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onReserveClick: () => void;
  onTrackClick: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Experience", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onReserveClick, onTrackClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] border-b",
          scrolled
            ? "bg-[#fdf0e7]/90 backdrop-blur-md border-[#1d1a1c]/10 text-[#1d1a1c] shadow-[0_6px_30px_-12px_rgba(29,26,28,0.12)]"
            : "bg-transparent border-white/25 text-white"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="#home"
              className="flex flex-col leading-none group focus:outline-none"
            >
              <span className="font-serif text-lg sm:text-xl tracking-[0.14em] uppercase">
                {HOTEL_CONFIG.name}
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.26em] mt-1 transition-colors",
                  scrolled ? "text-[#8a7f83]" : "text-white/75"
                )}
              >
                Boutique Sanctuary
              </span>
            </a>

            {/* Desktop Nav */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-8"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                    scrolled
                      ? "text-[#1d1a1c]/80 hover:text-[#1d1a1c] after:bg-[#f39419]"
                      : "text-white/85 hover:text-white after:bg-white"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={onTrackClick}
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-3 py-2 rounded-full transition-colors cursor-pointer",
                  scrolled
                    ? "text-[#5c5156] hover:text-[#1d1a1c] hover:bg-[#fbe7da]/70"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                )}
              >
                <SearchCheck className="h-3.5 w-3.5" />
                Track Booking
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={onReserveClick}
                className="px-5 py-2.5"
              >
                Reserve Your Stay
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onReserveClick}
                className="px-3.5 py-2 text-[11px]"
              >
                Reserve
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className={cn(
                  "p-2 rounded-full transition-colors cursor-pointer",
                  scrolled
                    ? "text-[#1d1a1c] hover:bg-[#fbe7da]"
                    : "text-white hover:bg-white/15"
                )}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 z-30 bg-[#fdf0e7]/98 backdrop-blur-lg border-b border-[#1d1a1c]/10 shadow-xl lg:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-lg font-medium text-[#1d1a1c] py-2 border-b border-[#1d1a1c]/10 flex items-center justify-between"
                >
                  {link.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onTrackClick();
                }}
                className="flex items-center gap-2 text-base font-medium text-[#5c5156] py-2 text-left cursor-pointer"
              >
                <SearchCheck className="h-4 w-4 text-[#f39419]" />
                Track Your Booking
              </button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setMobileOpen(false);
                  onReserveClick();
                }}
                className="w-full mt-2"
              >
                Reserve Your Stay
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
