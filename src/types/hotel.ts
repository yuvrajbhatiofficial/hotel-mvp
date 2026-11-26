export interface RoomCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  sizeSqFt: number;
  view: string;
  image: string;
  amenities: string[];
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | "Wifi"
    | "Waves"
    | "UtensilsCrossed"
    | "Sparkles"
    | "Dumbbell"
    | "ConciergeBell"
    | "Plane"
    | "Presentation";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  spanClass: string;
}

export interface HotelConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  hero: {
    image: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    highlights: string[];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    primaryImage: string;
    secondaryImage: string;
    floatingLabel: string;
    highlights: {
      title: string;
      description: string;
    }[];
  };
  rooms: RoomCategory[];
  amenities: AmenityItem[];
  gallery: GalleryItem[];
  contact: {
    addressLine1: string;
    addressLine2: string;
    cityCountry: string;
    phone: string;
    email: string;
    checkInTime: string;
    checkOutTime: string;
    googleMapsUrl: string;
    mapPlaceholderLabel: string;
  };
  finalCta: {
    image: string;
    heading: string;
    description: string;
  };
  socials: {
    label: string;
    href: string;
  }[];
}
