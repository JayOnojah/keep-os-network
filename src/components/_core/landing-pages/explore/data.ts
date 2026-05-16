export type FooterState =
  | { type: "open"; closesAt: string }
  | { type: "closed" }
  | { type: "price"; label: string };

export type BusinessCategory = "Restaurant" | "Hotel" | "Supermarket";

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  rating: number;
  reviewCount: number;
  location: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  favorited: boolean;
  footer: FooterState;
  menuItems?: string[];
  amenities?: string[];
  roomTypes?: string[];
};

export const EXPLORE_TABS = [
  { id: "all", label: "Browse All", pageTitle: "All Businesses" },
  {
    id: "restaurants",
    label: "Restaurants",
    pageTitle: "Restaurants",
    category: "Restaurant" as const,
  },
  { id: "hotels", label: "Hotels", pageTitle: "Hotels", category: "Hotel" as const },
  {
    id: "supermarket",
    label: "Supermarket",
    pageTitle: "Supermarkets",
    category: "Supermarket" as const,
  },
] as const;

export type ExploreTabId = (typeof EXPLORE_TABS)[number]["id"];

export function parseExploreTabId(
  value: string | null | undefined,
): ExploreTabId {
  if (value && EXPLORE_TABS.some((tab) => tab.id === value)) {
    return value as ExploreTabId;
  }
  return "all";
}

export const RATING_FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "4.6", label: "4.6 & above", minRating: 4.6 },
  { id: "4.0", label: "4.0 & above", minRating: 4.0 },
  { id: "3.5", label: "3.5 & above", minRating: 3.5 },
  { id: "3.0", label: "3.0 & above", minRating: 3.0 },
] as const;

export const MENU_FILTER_OPTIONS = [
  { id: "owo-soup", label: "Owo Soup" },
  { id: "jollof-rice", label: "Jollof Rice" },
  { id: "egusi-soup", label: "Egusi Soup" },
  { id: "pepper-soup", label: "Pepper Soup" },
  { id: "suya", label: "Suya" },
  { id: "fried-rice", label: "Fried Rice" },
  { id: "amala-ewedu", label: "Amala & Ewedu" },
  { id: "pounded-yam", label: "Pounded Yam" },
] as const;

export const AMENITIES_FILTER_OPTIONS = [
  { id: "free-wifi", label: "Free Wifi" },
  { id: "swimming-pool", label: "Swimming Pool" },
  { id: "breakfast-included", label: "Breakfast Included" },
  { id: "gym", label: "Gym" },
  { id: "free-parking", label: "Free Parking" },
  { id: "spa", label: "Spa" },
  { id: "room-service", label: "Room Service" },
  { id: "airport-shuttle", label: "Airport Shuttle" },
] as const;

export const ROOM_TYPE_FILTER_OPTIONS = [
  { id: "deluxe-room", label: "Deluxe Room" },
  { id: "executive-suite", label: "Executive Suite" },
  { id: "conference-room", label: "Conference Room" },
  { id: "presidential-suite", label: "Presidential Suite" },
  { id: "standard-room", label: "Standard Room" },
  { id: "family-suite", label: "Family Suite" },
  { id: "penthouse", label: "Penthouse" },
] as const;

export const EXPLORE_BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Snackbar & Grills",
    category: "Restaurant",
    rating: 4.9,
    reviewCount: 152,
    location: "Victoria Island, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Restaurant meal",
    href: "#",
    favorited: false,
    footer: { type: "open", closesAt: "11:00 PM" },
    menuItems: ["owo-soup", "jollof-rice", "suya", "pepper-soup"],
  },
  {
    id: "2",
    name: "The White Room Hotel",
    category: "Hotel",
    rating: 4.8,
    reviewCount: 89,
    location: "Ikoyi, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Hotel room",
    href: "#",
    favorited: true,
    footer: { type: "price", label: "From ₦45,000 / night" },
    amenities: [
      "free-wifi",
      "swimming-pool",
      "breakfast-included",
      "gym",
      "free-parking",
    ],
    roomTypes: [
      "deluxe-room",
      "executive-suite",
      "presidential-suite",
      "penthouse",
    ],
  },
  {
    id: "3",
    name: "FreshMart Express",
    category: "Supermarket",
    rating: 4.7,
    reviewCount: 210,
    location: "Lekki Phase 1, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Supermarket produce",
    href: "#",
    favorited: false,
    footer: { type: "open", closesAt: "10:00 PM" },
  },
  {
    id: "4",
    name: "La Terrasse Bistro",
    category: "Restaurant",
    rating: 4.6,
    reviewCount: 64,
    location: "Yaba, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Restaurant interior",
    href: "#",
    favorited: false,
    footer: { type: "open", closesAt: "9:30 PM" },
    menuItems: ["egusi-soup", "jollof-rice", "fried-rice", "pepper-soup"],
  },
  {
    id: "5",
    name: "Urban Stay Suites",
    category: "Hotel",
    rating: 4.5,
    reviewCount: 42,
    location: "Surulere, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Hotel exterior",
    href: "#",
    favorited: false,
    footer: { type: "closed" },
    amenities: ["free-wifi", "gym", "free-parking", "room-service"],
    roomTypes: ["standard-room", "deluxe-room", "executive-suite"],
  },
  {
    id: "6",
    name: "GreenBasket Foods",
    category: "Supermarket",
    rating: 4.8,
    reviewCount: 331,
    location: "Gbagada, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Grocery aisle",
    href: "#",
    favorited: false,
    footer: { type: "open", closesAt: "8:00 PM" },
  },
  {
    id: "7",
    name: "Coastal Kitchen",
    category: "Restaurant",
    rating: 4.9,
    reviewCount: 178,
    location: "Ajah, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Plated dish",
    href: "#",
    favorited: false,
    footer: { type: "price", label: "From ₦8,500 / meal" },
    menuItems: ["owo-soup", "pepper-soup", "amala-ewedu", "pounded-yam"],
  },
  {
    id: "8",
    name: "Harbour View Inn",
    category: "Hotel",
    rating: 4.7,
    reviewCount: 95,
    location: "Apapa, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Hotel lobby",
    href: "#",
    favorited: false,
    footer: { type: "open", closesAt: "12:00 AM" },
    amenities: [
      "free-wifi",
      "breakfast-included",
      "swimming-pool",
      "spa",
      "airport-shuttle",
    ],
    roomTypes: [
      "deluxe-room",
      "conference-room",
      "executive-suite",
      "family-suite",
    ],
  },
  {
    id: "9",
    name: "DailyNeeds Mega",
    category: "Supermarket",
    rating: 4.4,
    reviewCount: 512,
    location: "Ikeja, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1578916171728-46688e847b5b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Supermarket shelves",
    href: "#",
    favorited: false,
    footer: { type: "closed" },
  },
];
