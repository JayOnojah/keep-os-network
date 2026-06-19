"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MapPin, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  stackCoin,
  divisionIcon,
  bagIcon,
  locationIcon,
} from "@/assets";
import { Button } from "@/components/ui/button";

const ROTATING_CATEGORIES = ["Restaurants", "Hotels", "Supermarkets"] as const;

const FEATURES = [
  {
    title: "Earn KPS Points",
    description: "Earn points every time you spend.",
    icon: stackCoin,
  },
  {
    title: "Exclusive Deals",
    description: "Access special discounts and offers.",
    icon: divisionIcon,
  },
  {
    title: "Trusted Businesses",
    description: "Verified businesses for a better experience.",
    icon: bagIcon,
  },
  {
    title: "Near You",
    description: "Discover top-rated places around you.",
    icon: locationIcon,
  },
] as const;

export function LandingHero() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      const el = textRef.current;
      if (!el) return;

      gsap.to(el, {
        opacity: 0,
        y: -40,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setCategoryIndex((i) => (i + 1) % ROTATING_CATEGORIES.length);
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
          );
        },
      });
    }, 2800);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-1 flex-col">
      <div className="absolute inset-0">
        <Image
          src="/images/pngs/landing-pages/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="app-width flex w-full flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            Discover Amazing Places Near You
          </h1>

          {/* Rotating text — overflow-hidden clips the slide animation */}
          <p
            ref={textRef}
            className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {ROTATING_CATEGORIES[categoryIndex]}
          </p>

          <p className="mt-4 max-w-xl text-pretty text-base text-white/90 sm:text-lg">
            Find trusted businesses, earn rewards and save more.
          </p>

          <div className="mt-10 w-full max-w-3xl">
            <div className="flex flex-col gap-2 rounded-sm bg-white p-2 shadow-xl md:flex-row md:items-stretch md:rounded-xl md:p-3 md:pl-3">
              <div className="flex shrink-0 rounded-md items-center gap-2 px-3 py-2 md:py-0 md:pr-3 bg-[#ECF0FE]">
                <label className="sr-only" htmlFor="city-select">
                  City
                </label>
                <div className="relative min-w-0 flex-1">
                  <Select>
                    <SelectTrigger className="w-full shrink-0 border-none bg-[#ECF0FE] text-[#8E98A8] shadow-none focus:ring-0 md:w-auto">
                      <MapPin className="size-5 shrink-0 text-[#8E98A8]" aria-hidden />
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
              </div>

              <div className="flex min-h-11 flex-1 items-center gap-2 px-3 md:px-2 bg-[#ECF0FE] rounded-md">
                <Search
                  className="size-5 shrink-0 text-neutral-400"
                  aria-hidden
                />
                <label className="sr-only" htmlFor="hero-search">
                  Search businesses
                </label>
                <input
                  id="hero-search"
                  type="search"
                  placeholder="Search for hotels, restaurants, supermarkets..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                />
              </div>

              <Button
                type="button"
                className="h-11 shrink-0 rounded-md bg-primary px-4 font-semibold text-primary-foreground hover:bg-primary/90 md:h-auto md:rounded-md md:px-4"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-auto grid w-full max-w-6xl grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:pt-24">
          {FEATURES.map(({ title, description, icon }) => (
            <div
              key={title}
              className="flex gap-4 text-left sm:flex-col sm:gap-3 sm:text-center lg:flex-row lg:text-left md:border-r border-[#383838]"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <Image src={icon} alt="" className="size-6" aria-hidden />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-white/80">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}