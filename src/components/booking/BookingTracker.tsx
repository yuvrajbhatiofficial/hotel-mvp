"use client";

import React, { useState } from "react";
import { Search, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";
import { BookingRequest, BookingStatus } from "@/types/booking";
import {
  findBookingByReference,
  getBookings,
  updateBookingStatus,
} from "@/lib/booking-storage";
import { cn, formatDateDisplay } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { DemoStatusPanel } from "@/components/booking/DemoStatusPanel";

interface BookingTrackerProps {
  isOpen: boolean;
  initialReference?: string;
  onClose: () => void;
}

const STATUS_BADGE: Record<
  BookingStatus,
  { className: string; icon: React.ElementType }
> = {
  Pending: {
    className: "bg-amber-100 text-amber-900 border-amber-200",
    icon: Clock,
  },
  Confirmed: {
    className: "bg-emerald-100 text-emerald-900 border-emerald-200",
    icon: CheckCircle2,
  },
  Rejected: {
    className: "bg-rose-100 text-rose-900 border-rose-200",
    icon: XCircle,
  },
};

function BookingTrackerContent({
  initialReference,
}: {
  initialReference?: string;
}) {
  const [recentRefs] = useState<string[]>(() =>
    getBookings()
      .slice(0, 4)
      .map((b) => b.reference)
  );
  const [query, setQuery] = useState(initialReference ?? "");
  const [result, setResult] = useState<BookingRequest | null>(() =>
    initialReference ? findBookingByReference(initialReference) : null
  );
  const [notFound, setNotFound] = useState<boolean>(() =>
    initialReference ? !findBookingByReference(initialReference) : false
  );
  const [showDemoControls, setShowDemoControls] = useState(false);

  const performLookup = (refToSearch: string) => {
    const trimmed = refToSearch.trim();
    if (!trimmed) {
      setResult(null);
      setNotFound(false);
      return;
    }
    const found = findBookingByReference(trimmed);
    setResult(found);
    setNotFound(!found);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(query);
  };

  const handleStatusChange = (status: BookingStatus) => {
    if (!result) return;
    const updated = updateBookingStatus(result.reference, status);
    if (updated) {
      setResult(updated);
    }
  };

  const StatusBadge = result ? STATUS_BADGE[result.status] : null;
  const StatusIcon = StatusBadge ? StatusBadge.icon : Clock;

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="pr-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a7f83]">
          Reservation Lookup
        </span>
        <h2 className="font-serif text-3xl text-[#1d1a1c] mt-1">
          Track Your Booking
        </h2>
        <p className="text-sm text-[#5c5156] mt-1.5">
          Enter your booking reference (e.g.{" "}
          <span className="font-semibold text-[#1d1a1c]">GH-2026-001</span>) to
          view the current status of your stay request.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a7f83]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter booking reference..."
            aria-label="Booking reference"
            className="w-full rounded-full bg-white pl-10 pr-4 py-2.5 text-sm text-[#1d1a1c] border border-[#1d1a1c]/15 focus:outline-none focus:border-[#f39419] focus:ring-2 focus:ring-[#f39419]/20"
          />
        </div>
        <Button type="submit" variant="dark" size="md">
          Look Up
        </Button>
      </form>

      {/* Recent local references for quick demo */}
      {recentRefs.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#8a7f83]">Recent on this device:</span>
          {recentRefs.map((ref) => (
            <button
              key={ref}
              type="button"
              onClick={() => {
                setQuery(ref);
                performLookup(ref);
              }}
              className="rounded-full bg-white px-3 py-1 font-semibold text-[#1d1a1c] border border-[#1d1a1c]/10 hover:border-[#f39419] transition-colors cursor-pointer"
            >
              {ref}
            </button>
          ))}
        </div>
      )}

      {/* Not Found State */}
      {notFound && (
        <div className="rounded-2xl bg-white p-5 border border-rose-200 flex items-start gap-3 text-sm text-rose-900">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">No matching booking found</p>
            <p className="text-xs text-rose-800/80 mt-1">
              We couldn&apos;t find a booking request with reference &ldquo;
              {query}&rdquo; in this browser&apos;s local storage. Please check
              the reference and try again.
            </p>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && StatusBadge && (
        <div className="rounded-2xl bg-white p-6 border border-[#1d1a1c]/10 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1d1a1c]/10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#8a7f83] block">
                Booking Reference
              </span>
              <span className="text-xl font-bold text-[#1d1a1c]">
                {result.reference}
              </span>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold",
                StatusBadge.className
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {result.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                Guest Name
              </span>
              <span className="font-semibold text-[#1d1a1c]">
                {result.guestName}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                Room Category
              </span>
              <span className="font-semibold text-[#1d1a1c]">
                {result.roomCategory}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                Stay Dates
              </span>
              <span className="font-semibold text-[#1d1a1c]">
                {formatDateDisplay(result.checkIn)} –{" "}
                {formatDateDisplay(result.checkOut)}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8a7f83] block">
                Guests
              </span>
              <span className="font-semibold text-[#1d1a1c]">
                {result.adults} Adult{result.adults > 1 ? "s" : ""}
                {result.children > 0
                  ? `, ${result.children} Child${
                      result.children > 1 ? "ren" : ""
                    }`
                  : ""}
              </span>
            </div>
          </div>

          {/* Discreet Demo Controls Toggle */}
          <div className="pt-2 border-t border-[#1d1a1c]/8">
            <button
              type="button"
              onClick={() => setShowDemoControls((prev) => !prev)}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7f83] hover:text-[#1d1a1c] transition-colors cursor-pointer"
            >
              {showDemoControls
                ? "Hide Demo Status Controls"
                : "Demo Controls: Simulate Status Update"}
            </button>

            {showDemoControls && (
              <DemoStatusPanel
                reference={result.reference}
                currentStatus={result.status}
                onChangeStatus={handleStatusChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BookingTracker({
  isOpen,
  initialReference,
  onClose,
}: BookingTrackerProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Track Your Booking"
      maxWidthClass="max-w-xl"
    >
      {isOpen && (
        <BookingTrackerContent
          key={initialReference || "empty"}
          initialReference={initialReference}
        />
      )}
    </Modal>
  );
}
