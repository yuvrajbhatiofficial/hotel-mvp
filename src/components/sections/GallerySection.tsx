"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/gallery/Lightbox";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="VISUAL JOURNAL"
            heading="A Glimpse Into The Experience."
            subtitle="Sunlit courtyards, tactile interiors, and quiet moments across The Grand Haven."
          />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f83]">
            Click any frame to explore
          </p>
        </div>

        {/* Asymmetrical Masonry-Inspired Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[220px] sm:auto-rows-[250px] gap-4 sm:gap-5">
          {HOTEL_CONFIG.gallery.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-[#fbe7da] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f39419]",
                item.spanClass
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a1c]/75 via-[#1d1a1c]/10 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Expand className="h-4 w-4" />
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#fbe7da] block">
                  {item.category}
                </span>
                <p className="font-serif text-lg sm:text-xl mt-0.5">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        items={HOTEL_CONFIG.gallery}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChangeIndex={(index) => setActiveIndex(index)}
      />
    </section>
  );
}
