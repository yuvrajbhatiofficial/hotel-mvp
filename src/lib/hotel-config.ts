import { HotelConfig } from "@/types/hotel";

export const HOTEL_CONFIG: HotelConfig = {
  name: "THE GRAND HAVEN",
  shortName: "GRAND HAVEN",
  tagline: "A Sanctuary of Quiet Luxury",
  description:
    "An intimate boutique retreat where architectural serenity, warm hospitality, and bespoke culinary craft come together for an unforgettable stay.",
  hero: {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=85",
    headlineLine1: "AN ESCAPE",
    headlineLine2: "BEYOND ORDINARY",
    subheadline:
      "Discover a place where thoughtful hospitality meets unforgettable experiences.",
    highlights: [
      "Exceptional hospitality",
      "Thoughtfully designed rooms",
      "Memorable experiences",
    ],
  },
  about: {
    eyebrow: "THE EXPERIENCE",
    heading: "More Than Just A Stay.",
    paragraphs: [
      "Tucked away from the rush of the city, The Grand Haven is crafted around unhurried mornings, sunlit courtyards, and textures that invite you to exhale. Every corner balances timeless architectural warmth with contemporary ease.",
      "Whether you arrive for a restorative weekend, an intimate celebration, or a quiet creative retreat, our dedicated hosts anticipate every detail—from curated dining to bespoke local excursions.",
    ],
    primaryImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    secondaryImage:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85",
    floatingLabel: "A PLACE TO UNWIND",
    highlights: [
      {
        title: "Thoughtful Hospitality",
        description:
          "Attentive, discreet service tailored around your personal rhythm.",
      },
      {
        title: "Exceptional Comfort",
        description:
          "Natural linens, acoustic stillness, and sunlit private sanctuaries.",
      },
      {
        title: "Unforgettable Experiences",
        description:
          "Seasonal tasting menus, restorative spa rituals, and twilight lounges.",
      },
    ],
  },
  rooms: [
    {
      id: "deluxe-room",
      name: "Deluxe Room",
      tagline: "Warm sunlit sanctuary with garden views",
      description:
        "Thoughtfully proportioned with custom oak furnishings, soft linen drapery, and a rain shower sanctuary overlooking our manicured courtyard.",
      pricePerNight: 3499,
      maxAdults: 2,
      maxChildren: 1,
      bedType: "1 King Bed",
      sizeSqFt: 360,
      view: "Courtyard & Garden View",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85",
      amenities: [
        "King-size organic cotton bedding",
        "Walk-in rainfall shower",
        "High-speed Wi-Fi",
        "Artisanal tea & espresso bar",
        "Private Juliet balcony",
        "24/7 In-room dining",
      ],
    },
    {
      id: "premium-room",
      name: "Premium Room",
      tagline: "Elevated terrace living with lounging alcove",
      description:
        "Designed for unhurried stays, featuring an airy sitting alcove, handcrafted stone vanity, and a private terrace bathed in golden afternoon light.",
      pricePerNight: 4999,
      maxAdults: 2,
      maxChildren: 2,
      bedType: "1 King or Twin Beds",
      sizeSqFt: 450,
      view: "Pool & Terrace View",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
      amenities: [
        "Private furnished terrace",
        "Deep soaking tub & rain shower",
        "Dedicated workspace alcove",
        "Complimentary breakfast for two",
        "Curated mini-bar selection",
        "Evening turndown service",
      ],
    },
    {
      id: "executive-suite",
      name: "Executive Suite",
      tagline: "Separate living salon and panoramic skyline terrace",
      description:
        "An expansive residence offering a distinct living salon, dining table for four, and floor-to-ceiling glass framing tranquil vistas.",
      pricePerNight: 7499,
      maxAdults: 3,
      maxChildren: 2,
      bedType: "1 Plush King Bed + Sofa Lounge",
      sizeSqFt: 680,
      view: "Panoramic Horizon View",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=85",
      amenities: [
        "Separate living & entertaining salon",
        "Freestanding sculptural bathtub",
        "Complimentary airport transfer (one-way)",
        "Priority spa & dining reservations",
        "Nespresso & wine chiller",
        "Late check-out upon availability",
      ],
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      tagline: "Our signature penthouse with private plunge deck",
      description:
        "The pinnacle of The Grand Haven—featuring bespoke architectural detailing, a private dining room, wrap-around terrace, and dedicated butler service.",
      pricePerNight: 11999,
      maxAdults: 4,
      maxChildren: 2,
      bedType: "1 Master King Suite + Guest Alcove",
      sizeSqFt: 1150,
      view: "360° Estate & Pool Panorama",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
      amenities: [
        "Private plunge pool & sun deck",
        "Dedicated personal butler service",
        "Private dining for up to 6 guests",
        "Round-trip chauffeur airport transfers",
        "In-suite spa treatment setup",
        "Complimentary evening canapés",
      ],
    },
  ],
  amenities: [
    {
      id: "wifi",
      title: "Complimentary Wi-Fi",
      description: "Seamless high-speed connectivity across every suite and courtyard.",
      iconName: "Wifi",
    },
    {
      id: "pool",
      title: "Swimming Pool",
      description: "Temperature-controlled infinity pool with shaded daybeds.",
      iconName: "Waves",
    },
    {
      id: "dining",
      title: "Fine Dining",
      description: "Seasonal chef-led kitchen celebrating local flavours and craft.",
      iconName: "UtensilsCrossed",
    },
    {
      id: "spa",
      title: "Spa & Wellness",
      description: "Botanical therapies, steam suites, and quiet restorative rituals.",
      iconName: "Sparkles",
    },
    {
      id: "fitness",
      title: "Fitness Centre",
      description: "Sunlit movement studio equipped with modern cardio and strength.",
      iconName: "Dumbbell",
    },
    {
      id: "room-service",
      title: "24/7 Room Service",
      description: "Thoughtful in-room dining delivered at any hour of the day.",
      iconName: "ConciergeBell",
    },
    {
      id: "transfers",
      title: "Airport Transfers",
      description: "Private chauffeured arrivals and departures on request.",
      iconName: "Plane",
    },
    {
      id: "conference",
      title: "Conference Facilities",
      description: "Intimate boardrooms and salons for curated executive gatherings.",
      iconName: "Presentation",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Twilight Poolside Pavilion",
      category: "Exterior & Pool",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=85",
      spanClass: "md:col-span-2 md:row-span-2",
    },
    {
      id: "gal-2",
      title: "The Grand Arrival Lobby",
      category: "Lobby",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
      spanClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "gal-3",
      title: "Morning Light Suite",
      category: "Guest Rooms",
      image:
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=85",
      spanClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "gal-4",
      title: "Saffron & Stone Restaurant",
      category: "Fine Dining",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
      spanClass: "md:col-span-1 md:row-span-2",
    },
    {
      id: "gal-5",
      title: "Artisanal Tasting Table",
      category: "Dining Experience",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
      spanClass: "md:col-span-1 md:row-span-1",
    },
    {
      id: "gal-6",
      title: "Courtyard Lounge & Bar",
      category: "Interior Spaces",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85",
      spanClass: "md:col-span-2 md:row-span-1",
    },
  ],
  contact: {
    addressLine1: "14 Serenity Boulevard, Haven Enclave",
    addressLine2: "Customizable Property Location (Placeholder Address)",
    cityCountry: "Udaipur, Rajasthan 313001, India",
    phone: "+91 294 000 0199",
    email: "concierge@thegrandhaven.example",
    checkInTime: "2:00 PM onwards",
    checkOutTime: "11:00 AM",
    googleMapsUrl: "https://maps.google.com/?q=Udaipur,Rajasthan,India",
    mapPlaceholderLabel: "The Grand Haven — Interactive Map Location",
  },
  finalCta: {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85",
    heading: "Your Next Escape Starts Here.",
    description:
      "Discover thoughtful hospitality and make your next stay unforgettable.",
  },
  socials: [
    { label: "Instagram", href: "#contact" },
    { label: "Facebook", href: "#contact" },
    { label: "X / Twitter", href: "#contact" },
  ],
};
