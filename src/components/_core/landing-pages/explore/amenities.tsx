"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { AMENITIES_FILTER_OPTIONS } from "./data";

const AMENITIES_VISIBLE_COUNT = 5;

type ExploreAmenitiesProps = {
    selectedAmenities: Set<string>;
    onToggleAmenity: (id: string) => void;
};

const ExploreAmenities = ({
    selectedAmenities,
    onToggleAmenity,
}: ExploreAmenitiesProps) => {
    const [amenitiesOpen, setAmenitiesOpen] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const hasMore = AMENITIES_FILTER_OPTIONS.length > AMENITIES_VISIBLE_COUNT;
    const visibleOptions = showAll
        ? AMENITIES_FILTER_OPTIONS
        : AMENITIES_FILTER_OPTIONS.slice(0, AMENITIES_VISIBLE_COUNT);

    return (
        <div className="mt-1 border border-neutral-200/90 rounded-md p-4">
            <button
                type="button"
                className="flex w-full items-center justify-between text-left font-semibold uppercase tracking-wide text-neutral-900"
                onClick={() => setAmenitiesOpen((v) => !v)}
                aria-expanded={amenitiesOpen}
            >
                Amenities
                <ChevronDown
                    className={cn(
                        "size-4 text-neutral-500 transition-transform",
                        amenitiesOpen && "rotate-180",
                    )}
                />
            </button>
            {amenitiesOpen ? (
                <div className="mt-4">
                    <ul className="space-y-3">
                        {visibleOptions.map((option) => (
                            <li key={option.id}>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.has(option.id)}
                                        onChange={() => onToggleAmenity(option.id)}
                                        className="size-4 shrink-0 rounded border-neutral-300 accent-primary"
                                    />
                                    <span className="text-sm text-neutral-700">
                                        {option.label}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                    {hasMore ? (
                        <button
                            type="button"
                            onClick={() => setShowAll((v) => !v)}
                            className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/90"
                        >
                            {showAll ? "Show Less" : "Show More"}
                            <ChevronDown
                                className={cn(
                                    "size-4 transition-transform",
                                    showAll && "rotate-180",
                                )}
                            />
                        </button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

export default ExploreAmenities;
