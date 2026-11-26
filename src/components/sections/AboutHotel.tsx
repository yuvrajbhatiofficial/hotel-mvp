"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";

export function AboutHotel() {
  const { about } = HOTEL_CONFIG;

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#fdf0e7]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left: Asymmetric Photography Composition */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative pb-12 sm:pb-16"
          >
            <div className="relative aspect-[4/5] w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(29,26,28,0.18)]">
              <Image
                src={about.primaryImage}
                alt="The Grand Haven sunlit suite interior"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a1c]/30 via-transparent to-transparent" />
            </div>

            {/* Secondary overlapping photograph */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute right-2 sm:right-6 bottom-0 w-44 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-[#fdf0e7] shadow-2xl"
            >
              <Image
                src={about.secondaryImage}
                alt="Warm architectural lounge detail"
                fill
                sizes="260px"
                className="object-cover"
              />
            </motion.div>

            {/* Floating decorative label */}
            <div className="hidden sm:flex items-center gap-2.5 absolute -left-3 top-10 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 shadow-md border border-[#1d1a1c]/10">
              <span className="h-2 w-2 rounded-full bg-[#f39419]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1d1a1c]">
                {about.floatingLabel}
              </span>
            </div>
          </motion.div>

          {/* Right: Editorial Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8a7f83] mb-3">
              {about.eyebrow}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1d1a1c] leading-[1.1]">
              {about.heading}
            </h2>

            <div className="mt-6 space-y-5 text-base sm:text-lg text-[#5c5156] leading-relaxed">
              {about.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#amenities"
                className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#1d1a1c] border-b border-[#1d1a1c]/30 pb-1.5 hover:border-[#f39419] hover:text-[#f39419] transition-colors group"
              >
                Discover Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Three Hotel Highlights */}
        <div className="mt-20 pt-14 border-t border-[#1d1a1c]/10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {about.highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-2"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f39419]">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-2xl text-[#1d1a1c]">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#5c5156] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
