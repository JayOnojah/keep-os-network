"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Search,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shareIcon } from "@/assets";
import WriteReviewDialog from "@/components/_core/shared/write-review-dialog";

import { HotelBookingModal } from "./book";
import { getHotelById, type HotelRoom } from "./data";
import { RoomCard } from "./room-card";
import Reviews from "@/components/_core/shared/reviews";

type HotelDetailsPageProps = {
    hotelId: string;
};

export function HotelDetailsPage({ hotelId }: HotelDetailsPageProps) {
    const hotel = getHotelById(hotelId);
    const [activeCategory, setActiveCategory] = useState("deluxe-room");
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);

    const filteredRooms = useMemo(() => {
        if (!hotel) return [];
        return hotel.rooms.filter((room) => {
            const matchesCategory =
                activeCategory === "all" || room.categoryId === activeCategory;
            const matchesSearch =
                searchQuery.trim() === "" ||
                room.name
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [hotel, activeCategory, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredRooms.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const paginatedRooms = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredRooms.slice(start, start + rowsPerPage);
    }, [filteredRooms, currentPage, rowsPerPage]);

    if (!hotel) {
        return (
            <div className="app-width px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-neutral-900">
                    Hotel not found
                </h1>
                <p className="mt-2 text-neutral-500">
                    This hotel may have been removed or the link is invalid.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/explore?activeTab=hotels">Back to hotels</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white pb-12">
            <div className="app-width px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                    className="mb-6 text-sm text-neutral-500"
                    aria-label="Breadcrumb"
                >
                    <ol className="flex flex-wrap items-center gap-1.5">
                        <li>
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li aria-hidden className="text-neutral-300">
                            &gt;
                        </li>
                        <li>
                            <Link
                                href="/explore?activeTab=hotels"
                                className="hover:text-primary"
                            >
                                Hotels
                            </Link>
                        </li>
                        <li aria-hidden className="text-neutral-300">
                            &gt;
                        </li>
                        <li className="font-medium text-neutral-900">
                            {hotel.name}
                        </li>
                    </ol>
                </nav>

                <div className="mt-8">
                    <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white">
                        <div className="flex flex-col gap-6 p-4 sm:flex-row sm:items-center sm:p-6">
                            <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl sm:aspect-square sm:w-44">
                                <Image
                                    src={hotel.imageSrc}
                                    alt={hotel.imageAlt}
                                    fill
                                    sizes="176px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                                    {hotel.name}
                                </h1>
                                <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400">
                                    <MapPin className="size-4 shrink-0 text-neutral-400" />
                                    {hotel.location}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                    <span className="inline-flex items-center gap-1 text-neutral-800">
                                        <Star className="size-4 fill-amber-400 text-amber-400" />
                                        <span className="font-semibold text-amber-400">
                                            {hotel.rating}
                                        </span>
                                        <span className="text-neutral-500">
                                            ({hotel.reviewCount})
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <WriteReviewDialog>
                                        <Button className="rounded-md p-5">
                                            Write a Review (Earn KPS)
                                        </Button>
                                    </WriteReviewDialog>
                                    <Button
                                        variant="outline"
                                        className="rounded-md p-5"
                                    >
                                        <Image
                                            src={shareIcon}
                                            alt="shareIcon"
                                            width={20}
                                            height={20}
                                        />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div
                            className="flex gap-2 overflow-x-auto pb-1"
                            role="tablist"
                            aria-label="Room categories"
                        >
                            {hotel.categories.map((category) => {
                                const isActive = activeCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setPage(1);
                                        }}
                                        className={cn(
                                            "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-7 py-1.5 text-sm font-medium transition-colors",
                                            isActive
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300",
                                        )}
                                    >
                                        {category.id !== "all" ? (
                                            <span className="relative size-7 overflow-hidden rounded-full">
                                                <Image
                                                    src={category.imageSrc}
                                                    alt=""
                                                    fill
                                                    sizes="28px"
                                                    className="object-cover"
                                                />
                                            </span>
                                        ) : null}
                                        {category.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative mt-5">
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                                aria-hidden
                            />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search..."
                                className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginatedRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    onBookNow={(selected) => {
                                        setSelectedRoom(selected);
                                        setBookingOpen(true);
                                    }}
                                />
                            ))}
                        </div>

                        {filteredRooms.length === 0 ? (
                            <p className="py-12 text-center text-neutral-500">
                                No rooms match your search.
                            </p>
                        ) : null}

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-600">
                                Rows per page
                                <select
                                    value={rowsPerPage}
                                    onChange={(event) => {
                                        setRowsPerPage(Number(event.target.value));
                                        setPage(1);
                                    }}
                                    className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-neutral-600">
                                    Pages {currentPage} of {totalPages}
                                </span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="rounded-full"
                                    disabled={currentPage <= 1}
                                    onClick={() =>
                                        setPage((value) => Math.max(1, value - 1))
                                    }
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button
                                    type="button"
                                    size="icon-sm"
                                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    disabled={currentPage >= totalPages}
                                    onClick={() =>
                                        setPage((value) =>
                                            Math.min(totalPages, value + 1),
                                        )
                                    }
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Reviews
                    restaurantId={hotelId}
                    rating={hotel.rating}
                    reviewCount={hotel.reviewCount}
                />

                <HotelBookingModal
                    open={bookingOpen}
                    onOpenChange={setBookingOpen}
                    hotelName={hotel.name}
                    room={selectedRoom}
                />
            </div>
        </div>
    );
}
