"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const PRICE_MAX = 4500;

function formatNaira(value: number) {
    return `₦${value.toLocaleString("en-NG")}`;
}

type AllFiltersProps = {
    clearFilters: () => void;
    priceMin: number;
    priceMax: number;
    onPriceMinChange: (value: number) => void;
    onPriceMaxChange: (value: number) => void;
};

const AllFilters = ({
    clearFilters,
    priceMin,
    priceMax,
    onPriceMinChange,
    onPriceMaxChange,
}: AllFiltersProps) => {
    const [priceOpen, setPriceOpen] = useState(true);

    return (
        <div className="border border-neutral-200/90 rounded-md py-4">
            <div className="flex items-center border-b justify-between px-4 pb-2">
                <h2 className="font-bold text-neutral-900">Filters</h2>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-medium text-primary hover:text-primary/90"
                >
                    Clear all
                </button>
            </div>
            <div className="mt-1 border-neutral-100 px-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-between text-left font-semibold text-neutral-900"
                    onClick={() => setPriceOpen((v) => !v)}
                    aria-expanded={priceOpen}
                >
                    Price Range
                    <ChevronDown
                        className={cn(
                            "size-4 text-neutral-500 transition-transform",
                            priceOpen && "rotate-180",
                        )}
                    />
                </button>
                {priceOpen ? (
                    <div className="mt-4 space-y-4">
                        <div className="relative pt-2">
                            <div className="relative h-1.5 rounded-full bg-neutral-200">
                                <div
                                    className="absolute h-full rounded-full bg-primary"
                                    style={{
                                        left: `${(priceMin / PRICE_MAX) * 100}%`,
                                        right: `${100 - (priceMax / PRICE_MAX) * 100}%`,
                                    }}
                                />
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={PRICE_MAX}
                                value={priceMin}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    onPriceMinChange(Math.min(v, priceMax - 100));
                                }}
                                className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary"
                                aria-label="Minimum price"
                            />
                            <input
                                type="range"
                                min={0}
                                max={PRICE_MAX}
                                value={priceMax}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    onPriceMaxChange(Math.max(v, priceMin + 100));
                                }}
                                className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary"
                                aria-label="Maximum price"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="block">
                                <span className="mb-1.5 block text-xs text-neutral-500">
                                    Min
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={formatNaira(priceMin)}
                                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800"
                                />
                            </label>
                            <label className="block">
                                <span className="mb-1.5 block text-xs text-neutral-500">
                                    Max
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={formatNaira(priceMax)}
                                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-800"
                                />
                            </label>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AllFilters;
