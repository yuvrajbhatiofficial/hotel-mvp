"use client";

import React, { useMemo, useState } from "react";
import { Minus, Plus, AlertCircle } from "lucide-react";
import { HOTEL_CONFIG } from "@/lib/hotel-config";
import { BookingFormValues, BookingPrefill, BookingRequest } from "@/types/booking";
import {
  BookingValidationErrors,
  isBookingFormValid,
  validateBookingForm,
} from "@/lib/booking-validation";
import { createBookingRequest } from "@/lib/booking-storage";
import {
  addDaysISO,
  calculateNights,
  cn,
  formatINR,
  getTodayISO,
} from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface BookingFormProps {
  prefill?: BookingPrefill;
  onSuccess: (booking: BookingRequest) => void;
}

export function BookingForm({ prefill, onSuccess }: BookingFormProps) {
  const today = getTodayISO();
  const initialCheckIn = prefill?.checkIn || addDaysISO(today, 2);
  const initialCheckOut =
    prefill?.checkOut && prefill.checkOut > initialCheckIn
      ? prefill.checkOut
      : addDaysISO(initialCheckIn, 3);

  const [values, setValues] = useState<BookingFormValues>({
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    adults: prefill?.adults ?? 2,
    children: prefill?.children ?? 0,
    roomCategory: prefill?.roomCategory || HOTEL_CONFIG.rooms[0].name,
    guestName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: "",
  });

  const [touched, setTouched] = useState<
    Partial<Record<keyof BookingFormValues, boolean>>
  >({});
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const errors: BookingValidationErrors = useMemo(
    () => validateBookingForm(values),
    [values]
  );
  const formValid = useMemo(() => isBookingFormValid(values), [values]);

  const selectedRoom = useMemo(
    () =>
      HOTEL_CONFIG.rooms.find((r) => r.name === values.roomCategory) ||
      HOTEL_CONFIG.rooms[0],
    [values.roomCategory]
  );

  const nights = calculateNights(values.checkIn, values.checkOut);
  const estimatedTotal = nights * selectedRoom.pricePerNight;

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "checkIn" && typeof value === "string") {
        if (!next.checkOut || next.checkOut <= value) {
          next.checkOut = addDaysISO(value, 1);
        }
      }
      return next;
    });
  };

  const markTouched = (field: keyof BookingFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const showError = (field: keyof BookingFormValues): string | undefined => {
    if (submittedOnce || touched[field]) {
      return errors[field];
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedOnce(true);
    if (!formValid) return;

    const created = createBookingRequest(values);
    onSuccess(created);
  };

  const inputBase =
    "w-full rounded-xl bg-white px-3.5 py-2.5 text-sm text-[#1d1a1c] border border-[#1d1a1c]/12 focus:outline-none focus:border-[#f39419] focus:ring-2 focus:ring-[#f39419]/20 transition-all";

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-7">
      {/* Header */}
      <div className="pr-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a7f83]">
          {HOTEL_CONFIG.name} • Reservation Inquiry
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1d1a1c] mt-1">
          Request Your Stay
        </h2>
        <p className="text-sm text-[#5c5156] mt-1.5">
          Submit your preferred dates and room category. Our concierge team will
          review your request and confirm availability.
        </p>
      </div>

      {/* Section 1: Stay Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7f83] border-b border-[#1d1a1c]/10 pb-2">
          1. Stay Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="booking-checkin"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Check-in Date *
            </label>
            <input
              id="booking-checkin"
              type="date"
              min={today}
              value={values.checkIn}
              onChange={(e) => updateField("checkIn", e.target.value)}
              onBlur={() => markTouched("checkIn")}
              className={cn(
                inputBase,
                showError("checkIn") && "border-red-500/70"
              )}
            />
            {showError("checkIn") && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5" />
                {showError("checkIn")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-checkout"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Check-out Date *
            </label>
            <input
              id="booking-checkout"
              type="date"
              min={
                values.checkIn
                  ? addDaysISO(values.checkIn, 1)
                  : addDaysISO(today, 1)
              }
              value={values.checkOut}
              onChange={(e) => updateField("checkOut", e.target.value)}
              onBlur={() => markTouched("checkOut")}
              className={cn(
                inputBase,
                showError("checkOut") && "border-red-500/70"
              )}
            />
            {showError("checkOut") && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5" />
                {showError("checkOut")}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {/* Adults */}
          <div>
            <span className="block text-xs font-semibold text-[#1d1a1c] mb-1.5">
              Adults *
            </span>
            <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 border border-[#1d1a1c]/12">
              <button
                type="button"
                aria-label="Decrease adults"
                onClick={() => updateField("adults", Math.max(1, values.adults - 1))}
                disabled={values.adults <= 1}
                className="p-1 text-[#1d1a1c] hover:text-[#f39419] disabled:opacity-40 cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold">{values.adults}</span>
              <button
                type="button"
                aria-label="Increase adults"
                onClick={() => updateField("adults", Math.min(6, values.adults + 1))}
                className="p-1 text-[#1d1a1c] hover:text-[#f39419] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div>
            <span className="block text-xs font-semibold text-[#1d1a1c] mb-1.5">
              Children
            </span>
            <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 border border-[#1d1a1c]/12">
              <button
                type="button"
                aria-label="Decrease children"
                onClick={() =>
                  updateField("children", Math.max(0, values.children - 1))
                }
                disabled={values.children <= 0}
                className="p-1 text-[#1d1a1c] hover:text-[#f39419] disabled:opacity-40 cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold">{values.children}</span>
              <button
                type="button"
                aria-label="Increase children"
                onClick={() =>
                  updateField("children", Math.min(4, values.children + 1))
                }
                className="p-1 text-[#1d1a1c] hover:text-[#f39419] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Room Category */}
          <div>
            <label
              htmlFor="booking-room"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Room Category *
            </label>
            <select
              id="booking-room"
              value={values.roomCategory}
              onChange={(e) => updateField("roomCategory", e.target.value)}
              onBlur={() => markTouched("roomCategory")}
              className={cn(inputBase, "cursor-pointer")}
            >
              {HOTEL_CONFIG.rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name} ({formatINR(room.pricePerNight)}/night)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Strip */}
        {nights > 0 && (
          <div className="rounded-xl bg-[#fbe7da]/70 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm border border-[#f7d9c6]">
            <span className="text-[#5c5156]">
              Estimated stay: <strong className="text-[#1d1a1c]">{nights} night{nights > 1 ? "s" : ""}</strong> in{" "}
              <strong className="text-[#1d1a1c]">{selectedRoom.name}</strong>
            </span>
            <span className="font-bold text-[#1d1a1c]">
              {formatINR(estimatedTotal)}{" "}
              <span className="font-normal text-[#5c5156] text-xs">
                (indicative)
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Section 2: Guest Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7f83] border-b border-[#1d1a1c]/10 pb-2">
          2. Guest Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="booking-name"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Full Name *
            </label>
            <input
              id="booking-name"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={values.guestName}
              onChange={(e) => updateField("guestName", e.target.value)}
              onBlur={() => markTouched("guestName")}
              className={cn(
                inputBase,
                showError("guestName") && "border-red-500/70"
              )}
            />
            {showError("guestName") && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5" />
                {showError("guestName")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-email"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Email Address *
            </label>
            <input
              id="booking-email"
              type="email"
              placeholder="e.g. aarav@example.com"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => markTouched("email")}
              className={cn(
                inputBase,
                showError("email") && "border-red-500/70"
              )}
            />
            {showError("email") && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5" />
                {showError("email")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Mobile Number *
            </label>
            <input
              id="booking-phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => markTouched("phone")}
              className={cn(
                inputBase,
                showError("phone") && "border-red-500/70"
              )}
            />
            {showError("phone") && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-700">
                <AlertCircle className="h-3.5 w-3.5" />
                {showError("phone")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="booking-country"
              className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
            >
              Country (Optional)
            </label>
            <input
              id="booking-country"
              type="text"
              placeholder="e.g. India"
              value={values.country}
              onChange={(e) => updateField("country", e.target.value)}
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Additional Information */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7f83] border-b border-[#1d1a1c]/10 pb-2">
          3. Additional Information
        </h3>
        <div>
          <label
            htmlFor="booking-requests"
            className="block text-xs font-semibold text-[#1d1a1c] mb-1.5"
          >
            Special Requests / Message (Optional)
          </label>
          <textarea
            id="booking-requests"
            rows={3}
            placeholder="Airport transfer, dietary preferences, anniversary setup, or early check-in request..."
            value={values.specialRequests}
            onChange={(e) => updateField("specialRequests", e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-3 border-t border-[#1d1a1c]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#5c5156] leading-relaxed max-w-sm">
          This submits a <strong className="text-[#1d1a1c]">booking request</strong>—no
          payment is charged today.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!formValid}
          className="w-full sm:w-auto"
        >
          Submit Booking Request
        </Button>
      </div>
    </form>
  );
}
