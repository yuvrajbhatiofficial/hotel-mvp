"use client";

import React from "react";
import Image from "next/image";
import { Users, BedDouble, Maximize2, Eye, Check } from "lucide-react";
import { RoomCategory } from "@/types/hotel";
import { formatINR } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface RoomDetailsModalProps {
  room: RoomCategory | null;
  onClose: () => void;
  onRequestBooking: (room: RoomCategory) => void;
}

export function RoomDetailsModal({
  room,
  onClose,
  onRequestBooking,
}: RoomDetailsModalProps) {
  return (
    <Modal
      isOpen={Boolean(room)}
      onClose={onClose}
      title={room ? `${room.name} Details` : "Room Details"}
      maxWidthClass="max-w-3xl"
    >
      {room && (
        <div>
          {/* Large Image */}
          <div className="relative aspect-[16/9] w-full bg-[#fbe7da]">
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1a1c]/80 via-[#1d1a1c]/15 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#fbe7da]">
                  {room.tagline}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl mt-1">
                  {room.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-bold">
                  {formatINR(room.pricePerNight)}
                </span>
                <span className="block text-xs text-white/80">
                  per night (excl. taxes)
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-base text-[#5c5156] leading-relaxed">
              {room.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-white p-3.5 border border-[#1d1a1c]/8">
                <Users className="h-4 w-4 text-[#f39419] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-[#8a7f83]">
                  Occupancy
                </p>
                <p className="text-sm font-semibold text-[#1d1a1c] mt-0.5">
                  {room.maxAdults} Adults, {room.maxChildren} Kids
                </p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-[#1d1a1c]/8">
                <BedDouble className="h-4 w-4 text-[#f39419] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-[#8a7f83]">
                  Bed Type
                </p>
                <p className="text-sm font-semibold text-[#1d1a1c] mt-0.5">
                  {room.bedType}
                </p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-[#1d1a1c]/8">
                <Maximize2 className="h-4 w-4 text-[#f39419] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-[#8a7f83]">
                  Room Size
                </p>
                <p className="text-sm font-semibold text-[#1d1a1c] mt-0.5">
                  {room.sizeSqFt} sq ft
                </p>
              </div>
              <div className="rounded-xl bg-white p-3.5 border border-[#1d1a1c]/8">
                <Eye className="h-4 w-4 text-[#f39419] mb-1.5" />
                <p className="text-[11px] uppercase tracking-wider text-[#8a7f83]">
                  Aspect
                </p>
                <p className="text-sm font-semibold text-[#1d1a1c] mt-0.5">
                  {room.view}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7f83] mb-3">
                Included Amenities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {room.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-[#1d1a1c]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f7d9c6]/70 text-[#1d1a1c]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="pt-4 border-t border-[#1d1a1c]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#8a7f83]">
                Submit a booking request—our concierge will confirm availability
                shortly.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  onClose();
                  onRequestBooking(room);
                }}
              >
                Request Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
