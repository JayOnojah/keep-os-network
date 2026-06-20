"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Heart, MapPin, Menu, Search, X } from "lucide-react";
import Image from "next/image";

import { keepOSLogo } from "@/assets";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { GemSvg } from "../svg";
import MobileDrawer from "./mobile-drawer";
import RightNavItems from "./right-nav-items";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { NAV_LINKS } from "./nav-links";

const CITIES = [
    { value: "abuja", label: "Abuja" },
    { value: "lagos", label: "Lagos" },
    { value: "port-harcourt", label: "Port Harcourt" },
] as const;

const inputFieldClass =
    "flex h-11 items-center gap-2 rounded-xl bg-[#f0f2ff] px-3 text-sm text-neutral-800";

const desktopFieldClass =
    "flex h-11 items-center gap-2 rounded-xl bg-[#f0f2ff] px-3 text-sm text-neutral-800";


function CitySelect({
    className,
    defaultCity,
}: {
    className?: string;
    defaultCity?: string;
}) {
    return (
        <Select defaultValue={defaultCity}>
            <SelectTrigger
                className={cn(
                    "border-none bg-transparent rounded-lg! md:w-47.5! w-full shadow-none outline-none gap-0 p-0 h-10!",
                    className,
                )}
            >
                <MapPin className="size-4 shrink-0 text-neutral-500 mr-2" aria-hidden />
                <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
                {CITIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

function SearchInput({
    id,
    className,
    placeholder = "Search for hotels, restaurants, super...",
}: {
    id: string;
    className?: string;
    placeholder?: string;
}) {
    return (
        <div className={cn("flex min-w-0 items-center gap-2", className)}>
            <Search className="size-4 shrink-0 text-neutral-500" aria-hidden />
            <label htmlFor={id} className="sr-only">
                Search businesses
            </label>
            <input
                id={id}
                type="search"
                placeholder={placeholder}
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-500"
            />
        </div>
    );
}

export function ExploreNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const panelId = useId();

    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = () => setMenuOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b bg-white border-neutral-100 ">
            <div className="md:hidden">
                <div className="bg-[#eef2ff]">
                    <div className="app-width px-4 py-3">
                        <div className="flex items-center gap-3">

                            <Link
                                href="/"
                                className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3"
                            >
                                <Image
                                    src={keepOSLogo}
                                    alt="KeepOS Logo"
                                    height={32}
                                    width={155}

                                    aria-hidden
                                />
                            </Link>
                            <div className="flex min-w-0 flex-1 justify-center">
                                <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/12 px-3 py-1.5 text-xs font-semibold text-primary">
                                    <GemSvg />
                                    <span className="whitespace-nowrap">4,958 KPS</span>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-1">
                                <Link
                                    href="/favourite"
                                    className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600"
                                    aria-label="Favourites"
                                >
                                    <Heart className="size-5" strokeWidth={1.75} />
                                </Link>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="size-10"
                                    aria-expanded={menuOpen}
                                    aria-controls={panelId}
                                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                                    onClick={() => setMenuOpen((v) => !v)}
                                >
                                    {menuOpen ? (
                                        <X className="size-5" strokeWidth={2} />
                                    ) : (
                                        <Menu className="size-5" strokeWidth={2} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="h-16" aria-hidden />
                </div>
                <div className="h-30">
                    <div className="app-width -mt-16 h-20 md:bg-white bg-[#eef2ff] px-4 pb-3">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm">
                            <CitySelect className={inputFieldClass} />
                            <SearchInput
                                id="explore-search-mobile"
                                className={cn(inputFieldClass, "mt-2")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="app-width hidden px-6 py-4 md:block lg:px-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3"
                    >
                        <Image
                            src={keepOSLogo}
                            alt="KeepOS Logo"
                            height={32}
                            width={155}

                            aria-hidden
                        />
                    </Link>

                    <div className="flex min-w-0 flex-1 items-center gap-4">
                        <CitySelect className={cn(desktopFieldClass, "w-36 shrink-0")} defaultCity="abuja" />
                        <SearchInput
                            id="explore-search-desktop"
                            className={cn(desktopFieldClass, "min-w-0 flex-1 px-4")}
                            placeholder="Search for hotels, restaurants, supermarkets..."
                        />
                    </div>

                    <RightNavItems
                        open={menuOpen}
                        setOpen={setMenuOpen}
                        panelId={panelId}
                    />
                </div>
            </div>

            <MobileDrawer
                open={menuOpen}
                setOpen={setMenuOpen}
                panelId={panelId}
                navLinks={NAV_LINKS}
                topOffset="top-[12.5rem]"
            />
        </header>
    );
}
