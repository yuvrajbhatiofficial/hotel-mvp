"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { Button } from "@/components/ui/Button";

interface FinalCTAProps {
  onReserveClick: () => void;
}

export function FinalCTA({ onReserveClick }: FinalCTAProps) {
  const { finalCta } = HOTEL_CONFIG;

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-10 overflow-hidden bg-[#1d1a1c]">
      <Image
        src={finalCta.image}
        alt={`${HOTEL_CONFIG.name} evening exterior`}
        fill
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a1c] via-[#1d1a1c]/55 to-[#1d1a1c]/70" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center text-white"
      >
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fbe7da] mb-4">
          {HOTEL_CONFIG.name}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08]">
          {finalCta.heading}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
          {finalCta.description}
        </p>
        <div className="mt-9">
          <Button variant="primary" size="lg" onClick={onReserveClick}>
            Reserve Your Stay
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
