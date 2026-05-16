"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExploreBusinessCard } from "./business-card";
import {
    EXPLORE_BUSINESSES,
    EXPLORE_TABS,
    RATING_FILTER_OPTIONS,
    parseExploreTabId,
    type ExploreTabId,
} from "./data";
import AllRating from "./all-rating";
import ExploreMenu from "./menu";
import ExploreAmenities from "./amenities";
import ExploreRoomType from "./room-type";
import AllFilters from "./all-filters";

const PRICE_MAX = 4500;
const ACTIVE_TAB_PARAM = "activeTab";

export function ExplorePage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = useMemo(
        () => parseExploreTabId(searchParams.get(ACTIVE_TAB_PARAM)),
        [searchParams],
    );

    const setActiveTab = useCallback(
        (tab: ExploreTabId) => {
            const params = new URLSearchParams(searchParams.toString());
            if (tab === "all") {
                params.delete(ACTIVE_TAB_PARAM);
            } else {
                params.set(ACTIVE_TAB_PARAM, tab);
            }
            const query = params.toString();
            router.push(query ? `${pathname}?${query}` : pathname, {
                scroll: false,
            });
        },
        [pathname, router, searchParams],
    );
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(PRICE_MAX);
    const [selectedRatings, setSelectedRatings] = useState<Set<string>>(
        () => new Set(["all"]),
    );
    const [selectedMenus, setSelectedMenus] = useState<Set<string>>(
        () => new Set(),
    );
    const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(
        () => new Set(),
    );
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<Set<string>>(
        () => new Set(),
    );

    function toggleRoomTypeFilter(id: string) {
        setSelectedRoomTypes((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }

    function toggleAmenityFilter(id: string) {
        setSelectedAmenities((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }

    function toggleMenuFilter(id: string) {
        setSelectedMenus((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }

    function toggleRatingFilter(id: string) {
        setSelectedRatings((prev) => {
            if (id === "all") {
                return new Set(["all"]);
            }
            const next = new Set(prev);
            next.delete("all");
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            if (next.size === 0) {
                return new Set(["all"]);
            }
            return next;
        });
    }

    const filteredBusinesses = useMemo(() => {
        const tab = EXPLORE_TABS.find((t) => t.id === activeTab);
        const categoryFilter =
            tab && "category" in tab ? tab.category : undefined;

        const ratingThresholds = RATING_FILTER_OPTIONS.filter(
            (o): o is (typeof RATING_FILTER_OPTIONS)[number] & { minRating: number } =>
                selectedRatings.has(o.id) && "minRating" in o,
        ).map((o) => o.minRating);

        return EXPLORE_BUSINESSES.filter((b) => {
            if (categoryFilter && b.category !== categoryFilter) return false;
            if (
                !selectedRatings.has("all") &&
                ratingThresholds.length > 0 &&
                !ratingThresholds.some((min) => b.rating >= min)
            ) {
                return false;
            }
            if (
                activeTab === "restaurants" &&
                selectedMenus.size > 0 &&
                !b.menuItems?.some((item) => selectedMenus.has(item))
            ) {
                return false;
            }
            if (
                activeTab === "hotels" &&
                selectedAmenities.size > 0 &&
                !b.amenities?.some((item) => selectedAmenities.has(item))
            ) {
                return false;
            }
            if (
                activeTab === "hotels" &&
                selectedRoomTypes.size > 0 &&
                !b.roomTypes?.some((item) => selectedRoomTypes.has(item))
            ) {
                return false;
            }
            return true;
        });
    }, [activeTab, selectedRatings, selectedMenus, selectedAmenities, selectedRoomTypes]);

    const activeTabMeta = EXPLORE_TABS.find((t) => t.id === activeTab);
    const pageTitle = activeTabMeta?.pageTitle ?? "All Businesses";
    const showMenuFilter = activeTab === "restaurants";
    const showHotelsFilters = activeTab === "hotels";

    useEffect(() => {
        if (!showMenuFilter) {
            setSelectedMenus(new Set());
        }
    }, [showMenuFilter]);

    useEffect(() => {
        if (!showHotelsFilters) {
            setSelectedAmenities(new Set());
            setSelectedRoomTypes(new Set());
        }
    }, [showHotelsFilters]);

    function clearFilters() {
        setPriceMin(0);
        setPriceMax(PRICE_MAX);
        setSelectedRatings(new Set(["all"]));
        setSelectedMenus(new Set());
        setSelectedAmenities(new Set());
        setSelectedRoomTypes(new Set());
    }

    return (
        <div className="min-h-screen bg-white">
            <nav
                className="border-b border-neutral-100"
                aria-label="Business categories"
            >
                <div className="app-width flex justify-center gap-8 overflow-x-auto px-4 pt-4 sm:gap-12 sm:px-6 lg:px-8">
                    {EXPLORE_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors",
                                activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-neutral-500 hover:text-neutral-800",
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="app-width px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                        {pageTitle}
                    </h1>
                    <p className="text-sm text-neutral-500">
                        {filteredBusinesses.length} businesses found
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">
                    <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:z-10 lg:max-h-[calc(100dvh-5rem)] lg:w-64 lg:self-start lg:overflow-y-auto xl:w-72">
                        <div className="">

                            <AllFilters
                                clearFilters={clearFilters}
                                priceMin={priceMin}
                                priceMax={priceMax}
                                onPriceMinChange={setPriceMin}
                                onPriceMaxChange={setPriceMax}
                            />

                            {showMenuFilter ? (
                                <ExploreMenu
                                    selectedMenus={selectedMenus}
                                    onToggleMenu={toggleMenuFilter}
                                />
                            ) : null}
                            {showHotelsFilters ? (
                                <>
                                    <ExploreRoomType
                                        selectedRoomTypes={selectedRoomTypes}
                                        onToggleRoomType={toggleRoomTypeFilter}
                                    />
                                    <ExploreAmenities
                                        selectedAmenities={selectedAmenities}
                                        onToggleAmenity={toggleAmenityFilter}
                                    />
                                </>
                            ) : null}
                            <AllRating
                                selectedRatings={selectedRatings}
                                onToggleRating={toggleRatingFilter}
                            />
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredBusinesses.map((business) => (
                                <ExploreBusinessCard key={business.id} business={business} />
                            ))}
                        </div>

                        {filteredBusinesses.length === 0 ? (
                            <p className="py-16 text-center text-neutral-500">
                                No businesses match your filters.
                            </p>
                        ) : null}

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-600">
                                Rows per page
                                <select
                                    defaultValue="10"
                                    className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </label>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-neutral-600">Pages 1 of 1</span>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon-sm"
                                    className="rounded-full"
                                    disabled
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button
                                    type="button"
                                    size="icon-sm"
                                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
