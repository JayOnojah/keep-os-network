import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OfferAccent = "green" | "primary";

type Offer = {
  id: string;
  headline: string;
  headlineAccent: OfferAccent;
  subtitle: string;
  businessName: string;
  validUntil: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const OFFERS: Offer[] = [
  {
    id: "1",
    headline: "10% OFF",
    headlineAccent: "green",
    subtitle: "On all meals",
    businessName: "Snackbar & Grills",
    validUntil: "Valid till 30th June, 2026",
    imageSrc:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Grilled meal",
    href: "#",
  },
  {
    id: "2",
    headline: "₦5,000 OFF",
    headlineAccent: "primary",
    subtitle: "On stays above ₦50,000",
    businessName: "The White Room Hotel",
    validUntil: "Valid till 30th June, 2026",
    imageSrc:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Hotel room",
    href: "#",
  },
  {
    id: "3",
    headline: "5% OFF",
    headlineAccent: "green",
    subtitle: "On groceries",
    businessName: "FreshMart Supermarket",
    validUntil: "Valid till 30th June, 2026",
    imageSrc:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
    imageAlt: "Supermarket produce",
    href: "#",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  const { headline, headlineAccent, subtitle, businessName, validUntil, imageSrc, imageAlt, href } =
    offer;

  return (
    <Link
      href={href}
      className="flex flex-col gap-4 rounded-2xl border-2 border-primary bg-white p-4 lg:pr-0  shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-5 sm:pl-5"
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div
          className={cn(
            "flex flex-wrap items-center gap-1 text-base font-semibold sm:text-lg",
            headlineAccent === "green" && "text-green-600",
            headlineAccent === "primary" && "text-primary",
          )}
        >
          <span>{headline}</span>
          <ArrowRight className="size-4 shrink-0 sm:size-4.5" aria-hidden />
        </div>
        <p className="text-sm text-neutral-500">{subtitle}</p>
        <p className="font-bold text-neutral-900">{businessName}</p>
        <p className="text-xs text-neutral-500">{validUntil}</p>
      </div>
      <div className="relative mx-auto h-28 w-full shrink-0 overflow-hidden rounded-xl lg:rounded-r-0 sm:mx-0 sm:h-24 sm:w-32">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 128px"
          className="object-cover lg:translate-x-10 rounded-l-2xl"
        />
      </div>
    </Link>
  );
}

export function EarnRedeemSave() {
  return (
    <section className="bg-[#eef2ff] h-[60vh] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Earn. Redeem. Save.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
            Earn KPS points by leaving reviews and engaging with businesses.
            Redeem for exclusive discounts.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="rounded-md bg-primary px-8 h-12 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#">Browse All Businesses</Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[1.75rem] bg-primary px-4 py-10 sm:mt-14 sm:rounded-[2rem] sm:px-6 sm:py-12 lg:mt-16 lg:rounded-[2.5rem] lg:px-10 lg:py-14">
          <div
            className="pointer-events-none absolute -bottom-28 -left-28 size-72 rounded-full bg-black/10 sm:size-80"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-black/10 sm:-right-24 sm:-top-24 sm:size-72"
            aria-hidden
          />
          <div className="relative z-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
            {OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
