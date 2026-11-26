"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check, Clock } from "lucide-react";
import { BookingRequest } from "@/types/booking";
import { formatDateDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface BookingConfirmationProps {
  booking: BookingRequest;
  onClose: () => void;
  onTrackBooking: (reference: string) => void;
}

export function BookingConfirmation({
  booking,
  onClose,
  onTrackBooking,
}: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(booking.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 sm:p-10 text-center space-y-6"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fbe7da] text-[#f39419]">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 text-amber-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          <Clock className="h-3.5 w-3.5" />
          Request Status: {booking.status}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1d1a1c] pt-2">
          Your Request Has Been Received.
        </h2>
        <p className="text-sm sm:text-base text-[#5c5156] leading-relaxed">
          Thank you for choosing The Grand Haven. Your booking request has been
          submitted successfully. Our team will review your request and get back
          to you.
        </p>
      </div>

      {/* Reference Highlight */}
      <div className="mx-auto max-w-md rounded-2xl bg-white p-5 border border-[#1d1a1c]/10 shadow-sm">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a7f83]">
          Your Booking Reference
        </p>
        <div className="mt-1.5 flex items-center justify-center gap-3">
          <span className="font-sans text-2xl sm:text-3xl font-bold tracking-wider text-[#1d1a1c]">
            {booking.reference}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy booking reference"
            className="inline-flex items-center gap-1 rounded-full bg-[#fdf0e7] px-2.5 py-1 text-xs font-medium text-[#5c5156] hover:text-[#1d1a1c] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-700" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-[#8a7f83]">
          Save this reference to track your request status anytime.
        </p>
      </div>

      {/* Summary Details */}
      <div className="mx-auto max-w-md rounded-2xl bg-white/80 p-5 border border-[#1d1a1c]/8 text-left grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Guest Name
          </span>
          <span className="font-semibold text-[#1d1a1c]">
            {booking.guestName}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Selected Room
          </span>
          <span className="font-semibold text-[#1d1a1c]">
            {booking.roomCategory}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Check-in
          </span>
          <span className="font-semibold text-[#1d1a1c]">
            {formatDateDisplay(booking.checkIn)}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Check-out
          </span>
          <span className="font-semibold text-[#1d1a1c]">
            {formatDateDisplay(booking.checkOut)}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Guests
          </span>
          <span className="font-semibold text-[#1d1a1c]">
            {booking.adults} Adult{booking.adults > 1 ? "s" : ""}
            {booking.children > 0
              ? `, ${booking.children} Child${booking.children > 1 ? "ren" : ""}`
              : ""}
          </span>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
            Status
          </span>
          <span className="font-semibold text-amber-800">{booking.status}</span>
        </div>
      </div>

      <p className="text-xs text-[#8a7f83] max-w-md mx-auto">
        Note: This is a booking request pending hotel review, not an instant
        reservation confirmation.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button variant="primary" size="lg" onClick={onClose}>
          Back to Home
        </Button>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => onTrackBooking(booking.reference)}
        >
          Track Request Status
        </Button>
      </div>
    </motion.div>
  );
}
