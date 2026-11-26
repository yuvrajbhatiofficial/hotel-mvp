"use client";

import React, { useState } from "react";
import { MotionConfig } from "framer-motion";
import { RoomCategory } from "@/types/hotel";
import { BookingPrefill } from "@/types/booking";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BookingStrip } from "@/components/sections/BookingStrip";
import { AboutHotel } from "@/components/sections/AboutHotel";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { RoomDetailsModal } from "@/components/rooms/RoomDetailsModal";
import { BookingModal } from "@/components/booking/BookingModal";
import { BookingTracker } from "@/components/booking/BookingTracker";

export default function HomePage() {
  const [selectedRoomForDetails, setSelectedRoomForDetails] =
    useState<RoomCategory | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<
    BookingPrefill | undefined
  >(undefined);

  const [trackerOpen, setTrackerOpen] = useState(false);
  const [trackerInitialRef, setTrackerInitialRef] = useState<
    string | undefined
  >(undefined);

  const openBookingWithPrefill = (prefill?: BookingPrefill) => {
    setBookingPrefill(prefill);
    setBookingModalOpen(true);
  };

  const openTracker = (reference?: string) => {
    setTrackerInitialRef(reference);
    setTrackerOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#fdf0e7] text-[#1d1a1c]">
        <Navbar
          onReserveClick={() => openBookingWithPrefill()}
          onTrackClick={() => openTracker()}
        />

        <main className="flex-1">
          <Hero />
          <BookingStrip
            onCheckAvailability={(prefill) => openBookingWithPrefill(prefill)}
          />
          <AboutHotel />
          <RoomsSection
            onViewDetails={(room) => setSelectedRoomForDetails(room)}
            onRequestBooking={(room) =>
              openBookingWithPrefill({ roomCategory: room.name })
            }
          />
          <AmenitiesSection />
          <GallerySection />
          <LocationSection onReserveClick={() => openBookingWithPrefill()} />
          <FinalCTA onReserveClick={() => openBookingWithPrefill()} />
        </main>

        <Footer
          onReserveClick={() => openBookingWithPrefill()}
          onTrackClick={() => openTracker()}
        />

        <RoomDetailsModal
          room={selectedRoomForDetails}
          onClose={() => setSelectedRoomForDetails(null)}
          onRequestBooking={(room) =>
            openBookingWithPrefill({ roomCategory: room.name })
          }
        />

        <BookingModal
          isOpen={bookingModalOpen}
          prefill={bookingPrefill}
          onClose={() => setBookingModalOpen(false)}
          onTrackBooking={(ref) => openTracker(ref)}
        />

        <BookingTracker
          isOpen={trackerOpen}
          initialReference={trackerInitialRef}
          onClose={() => setTrackerOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
