import {
  BookingFormValues,
  BookingRequest,
  BookingStatus,
} from "@/types/booking";

const STORAGE_KEY = "grand_haven_booking_requests_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getBookings(): BookingRequest[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BookingRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: BookingRequest[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Ignore storage quota errors in demo mode
  }
}

export function generateBookingReference(existing: BookingRequest[]): string {
  const year = new Date().getFullYear();
  const nextNumber = existing.length + 1;
  const padded = String(nextNumber).padStart(3, "0");
  const candidate = `GH-${year}-${padded}`;

  // Ensure uniqueness if items were deleted or reordered
  const existingRefs = new Set(existing.map((b) => b.reference));
  if (!existingRefs.has(candidate)) {
    return candidate;
  }
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `GH-${year}-${randomSuffix}`;
}

export function createBookingRequest(values: BookingFormValues): BookingRequest {
  const existing = getBookings();
  const reference = generateBookingReference(existing);
  const newBooking: BookingRequest = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    reference,
    guestName: values.guestName.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    country: values.country.trim() || undefined,
    checkIn: values.checkIn,
    checkOut: values.checkOut,
    adults: values.adults,
    children: values.children,
    roomCategory: values.roomCategory,
    specialRequests: values.specialRequests.trim() || undefined,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  saveBookings([newBooking, ...existing]);
  return newBooking;
}

export function findBookingByReference(
  reference: string
): BookingRequest | null {
  const normalized = reference.trim().toUpperCase();
  if (!normalized) return null;
  const bookings = getBookings();
  return (
    bookings.find((b) => b.reference.toUpperCase() === normalized) || null
  );
}

export function updateBookingStatus(
  reference: string,
  status: BookingStatus
): BookingRequest | null {
  const normalized = reference.trim().toUpperCase();
  const bookings = getBookings();
  let updated: BookingRequest | null = null;

  const nextBookings = bookings.map((b) => {
    if (b.reference.toUpperCase() === normalized) {
      updated = { ...b, status };
      return updated;
    }
    return b;
  });

  if (updated) {
    saveBookings(nextBookings);
  }
  return updated;
}
