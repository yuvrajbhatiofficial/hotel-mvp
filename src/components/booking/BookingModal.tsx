"use client";

import React, { useState } from "react";
import { BookingPrefill, BookingRequest } from "@/types/booking";
import { Modal } from "@/components/ui/Modal";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

interface BookingModalProps {
  isOpen: boolean;
  prefill?: BookingPrefill;
  onClose: () => void;
  onTrackBooking: (reference: string) => void;
}

export function BookingModal({
  isOpen,
  prefill,
  onClose,
  onTrackBooking,
}: BookingModalProps) {
  const [submittedBooking, setSubmittedBooking] =
    useState<BookingRequest | null>(null);

  const handleClose = () => {
    setSubmittedBooking(null);
    onClose();
  };

  const prefillKey = JSON.stringify(prefill || {});

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Booking Request"
      maxWidthClass="max-w-2xl"
    >
      {submittedBooking ? (
        <BookingConfirmation
          booking={submittedBooking}
          onClose={handleClose}
          onTrackBooking={(ref) => {
            setSubmittedBooking(null);
            onClose();
            onTrackBooking(ref);
          }}
        />
      ) : (
        <BookingForm
          key={prefillKey}
          prefill={prefill}
          onSuccess={(created) => setSubmittedBooking(created)}
        />
      )}
    </Modal>
  );
}
