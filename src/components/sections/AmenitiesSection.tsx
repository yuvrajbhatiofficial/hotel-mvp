"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  ConciergeBell,
  Plane,
  Presentation,
} from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { AmenityItem } from "@/types/hotel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICON_MAP: Record<AmenityItem["iconName"], React.ElementType> = {
  Wifi,
  Waves,
  UtensilsCrossed,
  Sparkles,
  Dumbbell,
  ConciergeBell,
  Plane,
  Presentation,
};

export function AmenitiesSection() {
  return (
    <section
      id="amenities"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#fdf0e7]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="FACILITIES & SERVICES"
          heading="Everything You Need, And A Little More."
          subtitle="Thoughtful comforts woven seamlessly into every moment of your stay."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {HOTEL_CONFIG.amenities.map((amenity, idx) => {
            const Icon = ICON_MAP[amenity.iconName];
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-2xl bg-white/80 hover:bg-white p-5 sm:p-7 border border-[#1d1a1c]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-15px_rgba(29,26,28,0.12)]"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbe7da] text-[#1d1a1c] group-hover:bg-[#f39419] group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#1d1a1c]">
                  {amenity.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5c5156] leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
