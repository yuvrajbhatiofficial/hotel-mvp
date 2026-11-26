"use client";

import React from "react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { RoomCategory } from "@/types/hotel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomCard } from "@/components/rooms/RoomCard";

interface RoomsSectionProps {
  onViewDetails: (room: RoomCategory) => void;
  onRequestBooking: (room: RoomCategory) => void;
}

export function RoomsSection({
  onViewDetails,
  onRequestBooking,
}: RoomsSectionProps) {
  return (
    <section
      id="rooms"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="ACCOMMODATIONS"
            heading="Rooms Designed Around You."
            subtitle="Find your perfect space to relax, recharge, and experience something special."
          />
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f83] shrink-0">
            {HOTEL_CONFIG.rooms.length} Signature Categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {HOTEL_CONFIG.rooms.map((room, idx) => (
            <RoomCard
              key={room.id}
              room={room}
              index={idx}
              onViewDetails={onViewDetails}
              onRequestBooking={onRequestBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
