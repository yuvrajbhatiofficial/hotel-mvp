"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Maximize2, BedDouble, ArrowUpRight } from "lucide-react";
import { RoomCategory } from "@/types/hotel";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface RoomCardProps {
  room: RoomCategory;
  index: number;
  onViewDetails: (room: RoomCategory) => void;
  onRequestBooking: (room: RoomCategory) => void;
}

export function RoomCard({
  room,
  index,
  onViewDetails,
  onRequestBooking,
}: RoomCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col rounded-[16px] bg-white border border-[#1d1a1c]/8 shadow-[0_12px_36px_-14px_rgba(29,26,28,0.1)] hover:shadow-[0_24px_50px_-14px_rgba(29,26,28,0.18)] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Image Container */}
      <div
        onClick={() => onViewDetails(room)}
        className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-[#fbe7da]"
      >
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a1c]/75 via-[#1d1a1c]/15 to-transparent" />

        {/* Price Pill */}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2 text-white">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#fbe7da] block">
              {room.view}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
              {room.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              {formatINR(room.pricePerNight)}
            </span>
            <span className="block text-[11px] text-white/80">/ night</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm sm:text-base text-[#5c5156] leading-relaxed line-clamp-2">
          {room.description}
        </p>

        {/* Key Specs */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#5c5156] border-y border-[#1d1a1c]/8 py-3">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-[#f39419]" />
            Up to {room.maxAdults} Adults
            {room.maxChildren > 0 ? `, ${room.maxChildren} Child` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5 text-[#f39419]" />
            {room.bedType}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-[#f39419]" />
            {room.sizeSqFt} sq ft
          </span>
        </div>

        {/* Highlighted Amenities */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-[#fdf0e7] px-3 py-1 text-[11px] font-medium text-[#5c5156]"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(room)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1d1a1c] hover:text-[#f39419] transition-colors cursor-pointer"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <Button
            variant="dark"
            size="sm"
            onClick={() => onRequestBooking(room)}
            className="px-5 py-2.5"
          >
            Request Booking
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
