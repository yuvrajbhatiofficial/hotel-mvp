"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Calendar, Users, BedDouble, Minus, Plus, ArrowRight } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { BookingPrefill } from "@/types/booking";
import { addDaysISO, cn, formatDateDisplay, getTodayISO } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface BookingStripProps {
  onCheckAvailability: (prefill: BookingPrefill) => void;
}

const emptySubscribe = () => () => {};

export function BookingStrip({ onCheckAvailability }: BookingStripProps) {
  const today = useSyncExternalStore(emptySubscribe, getTodayISO, () => "");
  const [checkInState, setCheckInState] = useState<string>("");
  const [checkOutState, setCheckOutState] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [roomCategory, setRoomCategory] = useState<string>(
    HOTEL_CONFIG.rooms[0].name
  );
  const [activeField, setActiveField] = useState<string | null>(null);

  const checkIn = checkInState || (today ? addDaysISO(today, 2) : "");
  const checkOut = checkOutState || (today ? addDaysISO(today, 5) : "");

  const handleCheckInChange = (val: string) => {
    setCheckInState(val);
    if (val && (!checkOut || checkOut <= val)) {
      setCheckOutState(addDaysISO(val, 1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      roomCategory,
    });
  };

  return (
    <section
      aria-label="Quick availability search"
      className="relative z-20 -mt-14 sm:-mt-20 px-4 sm:px-6 lg:px-10"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-6xl rounded-[22px] bg-white/95 backdrop-blur-md shadow-[0_24px_60px_-15px_rgba(29,26,28,0.16)] border border-[#1d1a1c]/8 p-3 sm:p-4 lg:p-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-0 items-center">
          {/* Check-in */}
          <div
            onFocus={() => setActiveField("checkIn")}
            onBlur={() => setActiveField(null)}
            className={cn(
              "lg:col-span-2 px-4 py-3 rounded-2xl transition-all duration-300 lg:border-r border-[#1d1a1c]/10",
              activeField === "checkIn" &&
                "-translate-y-0.5 bg-[#fdf0e7]/70 shadow-sm"
            )}
          >
            <label
              htmlFor="strip-checkin"
              className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7f83]"
            >
              <Calendar className="h-3.5 w-3.5 text-[#f39419]" />
              Check-in
            </label>
            <input
              id="strip-checkin"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-semibold text-[#1d1a1c] focus:outline-none cursor-pointer"
            />
            <p className="text-[11px] text-[#5c5156] mt-0.5 truncate">
              {formatDateDisplay(checkIn)}
            </p>
          </div>

          {/* Check-out */}
          <div
            onFocus={() => setActiveField("checkOut")}
            onBlur={() => setActiveField(null)}
            className={cn(
              "lg:col-span-2 px-4 py-3 rounded-2xl transition-all duration-300 lg:border-r border-[#1d1a1c]/10",
              activeField === "checkOut" &&
                "-translate-y-0.5 bg-[#fdf0e7]/70 shadow-sm"
            )}
          >
            <label
              htmlFor="strip-checkout"
              className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7f83]"
            >
              <Calendar className="h-3.5 w-3.5 text-[#f39419]" />
              Check-out
            </label>
            <input
              id="strip-checkout"
              type="date"
              min={
                checkIn
                  ? addDaysISO(checkIn, 1)
                  : today
                    ? addDaysISO(today, 1)
                    : undefined
              }
              value={checkOut}
              onChange={(e) => setCheckOutState(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-semibold text-[#1d1a1c] focus:outline-none cursor-pointer"
            />
            <p className="text-[11px] text-[#5c5156] mt-0.5 truncate">
              {formatDateDisplay(checkOut)}
            </p>
          </div>

          {/* Adults & Children */}
          <div
            onFocus={() => setActiveField("guests")}
            onBlur={() => setActiveField(null)}
            className={cn(
              "lg:col-span-3 px-4 py-3 rounded-2xl transition-all duration-300 lg:border-r border-[#1d1a1c]/10",
              activeField === "guests" &&
                "-translate-y-0.5 bg-[#fdf0e7]/70 shadow-sm"
            )}
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7f83]">
              <Users className="h-3.5 w-3.5 text-[#f39419]" />
              Guests
            </span>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              {/* Adults stepper */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#5c5156]">Adults</span>
                <div className="flex items-center gap-1 rounded-full bg-[#fdf0e7] px-1.5 py-0.5 border border-[#1d1a1c]/10">
                  <button
                    type="button"
                    aria-label="Decrease adults"
                    onClick={() => setAdults((a) => Math.max(1, a - 1))}
                    className="p-1 text-[#1d1a1c] hover:text-[#f39419] disabled:opacity-40 cursor-pointer"
                    disabled={adults <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-xs font-semibold">
                    {adults}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase adults"
                    onClick={() => setAdults((a) => Math.min(6, a + 1))}
                    className="p-1 text-[#1d1a1c] hover:text-[#f39419] cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Children stepper */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#5c5156]">Kids</span>
                <div className="flex items-center gap-1 rounded-full bg-[#fdf0e7] px-1.5 py-0.5 border border-[#1d1a1c]/10">
                  <button
                    type="button"
                    aria-label="Decrease children"
                    onClick={() => setChildren((c) => Math.max(0, c - 1))}
                    className="p-1 text-[#1d1a1c] hover:text-[#f39419] disabled:opacity-40 cursor-pointer"
                    disabled={children <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-xs font-semibold">
                    {children}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase children"
                    onClick={() => setChildren((c) => Math.min(4, c + 1))}
                    className="p-1 text-[#1d1a1c] hover:text-[#f39419] cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Room Preference */}
          <div
            onFocus={() => setActiveField("room")}
            onBlur={() => setActiveField(null)}
            className={cn(
              "lg:col-span-3 px-4 py-3 rounded-2xl transition-all duration-300",
              activeField === "room" &&
                "-translate-y-0.5 bg-[#fdf0e7]/70 shadow-sm"
            )}
          >
            <label
              htmlFor="strip-room"
              className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a7f83]"
            >
              <BedDouble className="h-3.5 w-3.5 text-[#f39419]" />
              Room Preference
            </label>
            <select
              id="strip-room"
              value={roomCategory}
              onChange={(e) => setRoomCategory(e.target.value)}
              className="mt-1.5 w-full bg-transparent text-sm font-semibold text-[#1d1a1c] focus:outline-none cursor-pointer"
            >
              {HOTEL_CONFIG.rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit CTA */}
          <div className="sm:col-span-2 lg:col-span-2 flex justify-end p-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full rounded-[16px] py-4 text-sm font-semibold"
            >
              <span>Check Availability</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
