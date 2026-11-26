"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryItem } from "@/types/hotel";

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        onChangeIndex((activeIndex + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1a1c]/95 backdrop-blur-md p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#1d1a1c] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={() =>
              onChangeIndex((activeIndex - 1 + items.length) % items.length)
            }
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#1d1a1c] transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => onChangeIndex((activeIndex + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#1d1a1c] transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image Stage */}
          <motion.div
            key={items[activeIndex].id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#1d1a1c] shadow-2xl">
              <Image
                src={items[activeIndex].image}
                alt={items[activeIndex].title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-white px-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#fbe7da]">
                  {items[activeIndex].category}
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-0.5">
                  {items[activeIndex].title}
                </p>
              </div>
              <span className="text-xs tracking-widest text-white/60">
                {activeIndex + 1} / {items.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
