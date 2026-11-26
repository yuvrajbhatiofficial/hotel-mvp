import { BookingFormValues } from "@/types/booking";
import { getTodayISO } from "./utils";

export type BookingValidationErrors = Partial<
  Record<keyof BookingFormValues, string>
>;

export function validateBookingForm(
  values: BookingFormValues
): BookingValidationErrors {
  const errors: BookingValidationErrors = {};
  const today = getTodayISO();

  if (!values.checkIn) {
    errors.checkIn = "Check-in date is required.";
  } else if (values.checkIn < today) {
    errors.checkIn = "Check-in date cannot be in the past.";
  }

  if (!values.checkOut) {
    errors.checkOut = "Check-out date is required.";
  } else if (values.checkIn && values.checkOut <= values.checkIn) {
    errors.checkOut = "Check-out must be later than check-in.";
  }

  if (!values.adults || values.adults < 1) {
    errors.adults = "At least one adult is required.";
  }

  if (!values.roomCategory) {
    errors.roomCategory = "Please select a preferred room category.";
  }

  if (!values.guestName.trim()) {
    errors.guestName = "Full name is required.";
  } else if (values.guestName.trim().length < 2) {
    errors.guestName = "Please enter your full name.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const digitsOnly = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Mobile number is required.";
  } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = "Please enter a valid mobile number (7–15 digits).";
  }

  return errors;
}

export function isBookingFormValid(values: BookingFormValues): boolean {
  return Object.keys(validateBookingForm(values)).length === 0;
}
