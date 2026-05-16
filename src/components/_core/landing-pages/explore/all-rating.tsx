"use client";

import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { RATING_FILTER_OPTIONS } from "./data";

function RatingStars({ count }: { count: number }) {
    return (
        <span className="inline-flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "size-3.5",
                        i < count
                            ? "fill-amber-400 text-amber-400"
                            : "fill-neutral-200 text-neutral-200",
                    )}
                />
            ))}
        </span>
    );
}

type AllRatingProps = {
    selectedRatings: Set<string>;
    onToggleRating: (id: string) => void;
};

const AllRating = ({ selectedRatings, onToggleRating }: AllRatingProps) => {
    const [ratingsOpen, setRatingsOpen] = useState(true);

    return (
        <div className="mt-1 border border-neutral-200/90 rounded-md p-4">
            <button
                type="button"
                className="flex w-full items-center justify-between text-left font-semibold text-neutral-900"
                onClick={() => setRatingsOpen((v) => !v)}
                aria-expanded={ratingsOpen}
            >
                Ratings
                <ChevronDown
                    className={cn(
                        "size-4 text-neutral-500 transition-transform",
                        ratingsOpen && "rotate-180",
                    )}
                />
            </button>
            {ratingsOpen ? (
                <ul className="mt-4 space-y-3">
                    {RATING_FILTER_OPTIONS.map((option) => (
                        <li key={option.id}>
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedRatings.has(option.id)}
                                    onChange={() => onToggleRating(option.id)}
                                    className="size-4 shrink-0 rounded border-neutral-300 accent-primary"
                                />
                                <span className="flex flex-1 items-center gap-2 text-sm text-neutral-700">
                                    {option.id === "all" ? (
                                        option.label
                                    ) : (
                                        <>
                                            <RatingStars
                                                count={Math.min(
                                                    5,
                                                    Math.floor(Number(option.id)),
                                                )}
                                            />
                                            <span>{option.label}</span>
                                        </>
                                    )}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default AllRating;
