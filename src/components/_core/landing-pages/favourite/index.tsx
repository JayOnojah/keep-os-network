"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ExploreBusinessCard } from "@/components/_core/landing-pages/explore/business-card";
import {
    EXPLORE_BUSINESSES,
    EXPLORE_TABS,
    type ExploreTabId,
} from "@/components/_core/landing-pages/explore/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favorites-store";

import { FavouritesEmptyState } from "./favourites-empty-state";

export function FavouritesPage() {
    const [activeTab, setActiveTab] = useState<ExploreTabId>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const favoriteIds = useFavoritesStore((state) => state.ids);

    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        const navEl = navRef.current;
        if (!activeEl || !navEl) return;

        const navRect = navEl.getBoundingClientRect();
        const tabRect = activeEl.getBoundingClientRect();

        setIndicatorStyle({
            left: tabRect.left - navRect.left + navEl.scrollLeft,
            width: tabRect.width,
        });
    }, [activeTab]);

    const filteredFavourites = useMemo(() => {
        const tab = EXPLORE_TABS.find((entry) => entry.id === activeTab);
        const categoryFilter =
            tab && "category" in tab ? tab.category : undefined;

        return EXPLORE_BUSINESSES.filter((business) => {
            if (!favoriteIds.includes(business.id)) return false;
            if (categoryFilter && business.category !== categoryFilter) {
                return false;
            }
            return true;
        });
    }, [activeTab, favoriteIds]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredFavourites.length / rowsPerPage),
    );
    const currentPage = Math.min(page, totalPages);

    const paginatedFavourites = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredFavourites.slice(start, start + rowsPerPage);
    }, [filteredFavourites, currentPage, rowsPerPage]);

    return (
        <div className="min-h-screen bg-neutral-50">
            <nav
                className="border-b border-neutral-100 bg-white"
                aria-label="Favourite categories"
            >
                <div
                    ref={navRef}
                    className="app-width relative flex justify-center gap-8 overflow-x-auto px-4 pt-4 sm:gap-12 sm:px-6 lg:px-8"
                >
                    {EXPLORE_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            ref={(el) => { tabRefs.current[tab.id] = el; }}
                            type="button"
                            onClick={() => {
                                setActiveTab(tab.id);
                                setPage(1);
                            }}
                            className={cn(
                                "relative cursor-pointer shrink-0 pb-3 text-sm font-medium transition-colors duration-200",
                                activeTab === tab.id
                                    ? "text-primary"
                                    : "text-neutral-500 hover:text-neutral-800",
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}

                    {/* Sliding indicator */}
                    <span
                        className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-in-out"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                        }}
                    />
                </div>
            </nav>

            {/* rest of the component unchanged */}
            <div className="app-width px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="flex items-center gap-2">
                    <Link
                        href="/explore"
                        className="inline-flex size-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100"
                        aria-label="Back to explore"
                    >
                        <ChevronLeft className="size-5" strokeWidth={2} />
                    </Link>
                    <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                        Favourites
                    </h1>
                </div>

                {filteredFavourites.length === 0 ? (
                    favoriteIds.length === 0 ? (
                        <FavouritesEmptyState />
                    ) : (
                        <p className="mt-12 text-center text-neutral-500">
                            No favourites in this category yet. Try another tab
                            or explore more vendors.
                        </p>
                    )
                ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedFavourites.map((business) => (
                            <ExploreBusinessCard
                                key={business.id}
                                business={business}
                            />
                        ))}
                    </div>
                )}

                {filteredFavourites.length > 0 ? (
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
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
                ) : null}
            </div>
        </div>
    );
}