"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface LocationSectionProps {
  onReserveClick: () => void;
}

export function LocationSection({ onReserveClick }: LocationSectionProps) {
  const { contact } = HOTEL_CONFIG;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#fdf0e7]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <SectionHeading
              eyebrow="LOCATION & CONCIERGE"
              heading="We'd Love To Welcome You."
            />

            <div className="space-y-5 text-sm sm:text-base text-[#5c5156]">
              <div className="flex items-start gap-3.5">
                <MapPin className="h-5 w-5 text-[#f39419] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1d1a1c]">
                    {contact.addressLine1}
                  </p>
                  <p className="text-xs text-[#8a7f83] mt-0.5">
                    {contact.addressLine2}
                  </p>
                  <p className="mt-0.5">{contact.cityCountry}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="h-5 w-5 text-[#f39419] shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#1d1a1c] transition-colors"
                >
                  {contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-3.5">
                <Mail className="h-5 w-5 text-[#f39419] shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#1d1a1c] transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-[#1d1a1c]/10">
                <Clock className="h-5 w-5 text-[#f39419] shrink-0 mt-0.5" />
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                      Check-in
                    </span>
                    <span className="font-semibold text-[#1d1a1c]">
                      {contact.checkInTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                      Check-out
                    </span>
                    <span className="font-semibold text-[#1d1a1c]">
                      {contact.checkOutTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="primary" size="lg" onClick={onReserveClick}>
                Request a Stay
              </Button>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-dark" size="lg">
                  Open in Google Maps
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: Polished Map Placeholder Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#fbe7da] border border-[#1d1a1c]/10 shadow-[0_24px_60px_-15px_rgba(29,26,28,0.14)] flex items-center justify-center p-6">
              {/* Architectural Grid Texture */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(29,26,28,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,26,28,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-radial from-transparent via-[#fdf0e7]/40 to-[#f7d9c6]/80"
              />

              {/* Center Pin Card */}
              <div className="relative z-10 max-w-sm w-full rounded-2xl bg-white/95 backdrop-blur-md p-6 text-center shadow-xl border border-[#1d1a1c]/10">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f39419] text-white shadow-md">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8a7f83]">
                  Property Coordinates
                </p>
                <h3 className="font-serif text-2xl text-[#1d1a1c] mt-1">
                  {HOTEL_CONFIG.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c5156] mt-1.5">
                  {contact.addressLine1}, {contact.cityCountry}
                </p>
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f39419] hover:text-[#1d1a1c] transition-colors"
                >
                  View Directions on Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
