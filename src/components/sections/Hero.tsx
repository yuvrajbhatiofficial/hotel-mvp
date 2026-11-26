"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { Button } from "@/components/ui/Button";

function AnimatedWords({
  text,
  delayOffset = 0,
}: {
  text: string;
  delayOffset?: number;
}) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-[0.28em]">
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delayOffset + idx * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block bg-gradient-to-b from-white via-white to-[#fbe7da] bg-clip-text text-transparent"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { hero } = HOTEL_CONFIG;

  return (
    <section
      id="home"
      className="relative min-h-[680px] lg:h-screen flex flex-col justify-end overflow-hidden bg-[#1d1a1c]"
    >
      {/* Full-bleed background with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative h-full w-full animate-ken-burns">
          <Image
            src={hero.image}
            alt={`${HOTEL_CONFIG.name} luxury courtyard and pool`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Atmospheric overlays: subtle dark/mauve top tint + bottom peach fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1a1c]/65 via-[#1d1a1c]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdf0e7] via-[#1d1a1c]/35 to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fdf0e7] to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-32 pb-28 sm:pb-36 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left: Headline & CTAs */}
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#fbe7da] mb-4"
            >
              {HOTEL_CONFIG.name} • {HOTEL_CONFIG.tagline}
            </motion.span>

            <h1 className="font-sans font-bold uppercase text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.95] tracking-[-0.02em]">
              <span className="block">
                <AnimatedWords text={hero.headlineLine1} delayOffset={0.18} />
              </span>
              <span className="block mt-1">
                <AnimatedWords text={hero.headlineLine2} delayOffset={0.36} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base sm:text-lg text-white/90 font-normal leading-relaxed drop-shadow-sm"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a href="#rooms">
                <Button variant="primary" size="lg">
                  Explore Rooms
                </Button>
              </a>
              <a href="#about">
                <Button variant="outline-light" size="lg">
                  Discover the Hotel
                  <ArrowDownRight className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Editorial Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:flex lg:justify-end"
          >
            <div className="border-l border-white/40 pl-5 py-1 space-y-2.5 text-white/90 max-w-xs">
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#fbe7da]">
                Curated Sanctuary
              </p>
              <ul className="space-y-1.5 text-sm sm:text-base font-light">
                {hero.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#f7c325]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
