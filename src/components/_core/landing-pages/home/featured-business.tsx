import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FooterState =
  | { type: "open"; closesAt: string }
  | { type: "closed" }
  | { type: "price"; label: string };

type Business = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  favorited: boolean;
  footer: FooterState;
};

const BUSINESSES: Business[] = [
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
  },
  {
    id: "9",
    name: "DailyNeeds Mega",
    category: "Supermarket",
    rating: 4.4,
    reviewCount: 512,
    location: "Ikeja, Lagos",
    imageSrc:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Supermarket shelves",
    href: "#",
    favorited: false,
    footer: { type: "closed" },
  },
];

function CardFooter({ footer }: { footer: FooterState }) {
  if (footer.type === "open") {
    return (
      <p className="inline-block rounded-full bg-[#EEF2FF] px-2 py-1 text-sm text-primary">
        Open • Closes {footer.closesAt}
      </p>
    );
  }
  if (footer.type === "closed") {
    return (
      <span className="inline-flex rounded-full bg-red-500/10 px-2 py-0.5 text-sm text-red-600">
        Closed
      </span>
    );
  }
  return (
    <p className="inline-block rounded-full bg-[#EEF2FF] px-2 py-1 text-sm font-medium text-primary">
      {footer.label}
    </p>
  );
}

function BusinessCard({ business }: { business: Business }) {
  const {
    name,
    category,
    rating,
    reviewCount,
    location,
    imageSrc,
    imageAlt,
    href,
    favorited,
    footer,
  } = business;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-shadow hover:shadow-md">
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/95 text-neutral-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        aria-label={favorited ? "Saved to favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "size-4.5",
            favorited ? "fill-red-500 text-red-500" : "text-neutral-600",
          )}
          strokeWidth={favorited ? 0 : 1.75}
        />
      </button>
      <Link
        href={href}
        className="relative z-2 flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <h3 className="font-bold leading-snug text-neutral-900">{name}</h3>
            <p className="mt-0.5 text-sm text-[#8E98A8]">{category}</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-700">
            <Star
              className="size-3.5 shrink-0 fill-amber-400 text-amber-400"
              aria-hidden
            />
            <span className="font-medium text-amber-400">{rating}</span>
            <span className="text-[#8E98A8]">({reviewCount})</span>
          </div>
          <div className="flex items-start gap-1.5 text-sm text-neutral-500">
            <MapPin
              className="mt-0.5 size-3.5 shrink-0 text-[#8E98A8]"
              aria-hidden
            />
            <span className="leading-snug text-[#8E98A8]">{location}</span>
          </div>
          <div className="mt-auto">
            <CardFooter footer={footer} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export function FeaturedBusinesses() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="app-width">
        <h2 className="text-left text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Featured Businesses
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-8">
          {BUSINESSES.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
        <div className="mt-10 flex justify-center lg:mt-12">
          <Button
            variant="outline"
            className="gap-1.5 rounded-md h-12 border-primary px-6 font-semibold text-primary hover:bg-primary/5 hover:text-primary"
            asChild
          >
            <Link href="/explore">
              See All
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
