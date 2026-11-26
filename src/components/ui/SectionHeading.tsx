"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      <span
        className={cn(
          "inline-block text-[11px] font-semibold uppercase tracking-[0.26em] mb-3",
          light ? "text-[#fbe7da]" : "text-[#8a7f83]"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-[-0.01em]",
          light ? "text-white" : "text-[#1d1a1c]"
        )}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            light ? "text-white/80" : "text-[#5c5156]"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
