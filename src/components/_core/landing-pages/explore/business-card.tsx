import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favorites-store";

import type { Business, FooterState } from "./data";

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

export function ExploreBusinessCard({ business }: { business: Business }) {
  const {
    id,
    name,
    category,
    rating,
    reviewCount,
    location,
    imageSrc,
    imageAlt,
    href,
    footer,
  } = business;

  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggle);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/95 text-neutral-600 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
        aria-label={
          isFavorite ? "Remove from favourites" : "Add to favourites"
        }
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(id);
        }}
      >
        <Heart
          className={cn(
            "size-4.5",
            isFavorite ? "fill-red-500 text-red-500" : "text-neutral-600",
          )}
          strokeWidth={isFavorite ? 0 : 1.75}
        />
      </button>
      <Link
        href={href}
        className="relative flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            <p className="mt-0.5 text-sm text-neutral-500">{category}</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-neutral-700">
            <Star
              className="size-3.5 shrink-0 fill-amber-400 text-amber-400"
              aria-hidden
            />
            <span className="font-medium text-amber-400">{rating}</span>
            <span className="text-neutral-400">({reviewCount})</span>
          </div>
          <div className="flex items-start gap-1.5 text-sm text-neutral-500">
            <MapPin
              className="mt-0.5 size-3.5 shrink-0 text-neutral-400"
              aria-hidden
            />
            <span className="leading-snug">{location}</span>
          </div>
          <div className="mt-auto pt-1">
            <CardFooter footer={footer} />
          </div>
        </div>
      </Link>
    </div>
  );
}
