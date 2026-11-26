"use client";

import React, { useSyncExternalStore } from "react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";

interface FooterProps {
  onReserveClick: () => void;
  onTrackClick: () => void;
}

const emptySubscribe = () => () => {};

export function Footer({ onReserveClick, onTrackClick }: FooterProps) {
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => String(new Date().getFullYear()),
    () => "2026"
  );

  return (
    <footer className="bg-[#1d1a1c] text-white/85 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <p className="font-serif text-2xl tracking-[0.14em] text-white uppercase">
                {HOTEL_CONFIG.name}
              </p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#f7d9c6] mt-1">
                {HOTEL_CONFIG.tagline}
              </p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {HOTEL_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f7d9c6]">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onTrackClick}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Your Booking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onReserveClick}
                  className="text-[#f39419] hover:text-[#f7c325] transition-colors cursor-pointer text-left font-medium"
                >
                  Reserve Your Stay
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f7d9c6]">
              Concierge
            </p>
            <div className="space-y-2 text-sm text-white/75">
              <p>{HOTEL_CONFIG.contact.addressLine1}</p>
              <p>{HOTEL_CONFIG.contact.cityCountry}</p>
              <p className="pt-1">{HOTEL_CONFIG.contact.phone}</p>
              <p>{HOTEL_CONFIG.contact.email}</p>
            </div>
            <div className="pt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-white/60">
              {HOTEL_CONFIG.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="hover:text-[#f7d9c6] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {currentYear} {HOTEL_CONFIG.name}. All rights reserved. (MVP
            Demonstration)
          </p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-white/80 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
