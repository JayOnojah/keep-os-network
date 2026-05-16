"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { ROOM_TYPE_FILTER_OPTIONS } from "./data";

const ROOM_TYPE_VISIBLE_COUNT = 5;

type ExploreRoomTypeProps = {
    selectedRoomTypes: Set<string>;
    onToggleRoomType: (id: string) => void;
};

const ExploreRoomType = ({
    selectedRoomTypes,
    onToggleRoomType,
}: ExploreRoomTypeProps) => {
    const [roomTypeOpen, setRoomTypeOpen] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const hasMore = ROOM_TYPE_FILTER_OPTIONS.length > ROOM_TYPE_VISIBLE_COUNT;
    const visibleOptions = showAll
        ? ROOM_TYPE_FILTER_OPTIONS
        : ROOM_TYPE_FILTER_OPTIONS.slice(0, ROOM_TYPE_VISIBLE_COUNT);

    return (
        <div className="mt-1 border border-neutral-200/90 rounded-md p-4">
            <button
                type="button"
                className="flex w-full items-center justify-between text-left font-semibold uppercase tracking-wide text-neutral-900"
                onClick={() => setRoomTypeOpen((v) => !v)}
                aria-expanded={roomTypeOpen}
            >
                Room Type
                <ChevronDown
                    className={cn(
                        "size-4 text-neutral-500 transition-transform",
                        roomTypeOpen && "rotate-180",
                    )}
                />
            </button>
            {roomTypeOpen ? (
                <div className="mt-4">
                    <ul className="space-y-3">
                        {visibleOptions.map((option) => (
                            <li key={option.id}>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedRoomTypes.has(option.id)}
                                        onChange={() => onToggleRoomType(option.id)}
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

export default ExploreRoomType;
