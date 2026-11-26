export type BookingStatus = "Pending" | "Confirmed" | "Rejected";

export interface BookingRequest {
  id: string;
  reference: string;
  guestName: string;
  email: string;
  phone: string;
  country?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomCategory: string;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingFormValues {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomCategory: string;
  guestName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
}

export interface BookingPrefill {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  roomCategory?: string;
}
