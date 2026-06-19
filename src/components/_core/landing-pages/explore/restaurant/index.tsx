"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Search,
    SlidersHorizontal,
    Star,
} from "lucide-react";

import { useRestaurantCart } from "@/store/restaurant-cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shareIcon } from "@/assets";
import WriteReviewDialog from "@/components/_core/shared/write-review-dialog";

import { getRestaurantById, getRestaurantStatus } from "./data";
import { MenuProductCard } from "./menu-product-card";
import Cart from "./cart";
import Reviews from "../../../shared/reviews";

type RestaurantDetailsPageProps = {
    restaurantId: string;
};

export function RestaurantDetailsPage({
    restaurantId,
}: RestaurantDetailsPageProps) {
    const restaurant = getRestaurantById(restaurantId);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const { quantities, cartCount, setProductQuantity } =
        useRestaurantCart(restaurantId);

    const filteredProducts = useMemo(() => {
        if (!restaurant) return [];
        return restaurant.products.filter((product) => {
            const matchesCategory =
                activeCategory === "all" ||
                product.categoryId === activeCategory ||
                (activeCategory.startsWith("fish-cuisine") &&
                    product.categoryId.startsWith("fish-cuisine"));
            const matchesSearch =
                searchQuery.trim() === "" ||
                product.name
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [restaurant, activeCategory, searchQuery]);

    if (!restaurant) {
        return (
            <div className="app-width px-4 py-16 text-center sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-neutral-900">
                    Restaurant not found
                </h1>
                <p className="mt-2 text-neutral-500">
                    This restaurant may have been removed or the link is invalid.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/explore?activeTab=restaurants">Back to restaurants</Link>
                </Button>
            </div>
        );
    }

    const status = getRestaurantStatus(restaurant.footer);

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
                            <ChevronRight className="size-4" aria-hidden />
                        </li>
                        <li>
                            <Link
                                href="/explore?activeTab=restaurants"
                                className="hover:text-primary"
                            >
                                Restaurants
                            </Link>
                        </li>
                        <li aria-hidden className="text-neutral-900">
                            <ChevronRight className="size-4" aria-hidden />
                        </li>
                        <li className="font-medium text-neutral-900">
                            {restaurant.name}
                        </li>
                    </ol>
                </nav>


                <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
                    <div className="flex-1">
                        <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white">
                            <div className="flex flex-col gap-6 p-4 sm:flex-row sm:items-center sm:p-6">
                                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl sm:aspect-square sm:w-44">
                                    <Image
                                        src={restaurant.imageSrc}
                                        alt={restaurant.imageAlt}
                                        fill
                                        sizes="176px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                                        {restaurant.name}
                                    </h1>
                                    <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-400">
                                        <MapPin className="size-4 shrink-0 text-neutral-400" />
                                        {restaurant.location}
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                        <span className="inline-flex items-center gap-1 text-neutral-800">
                                            <Star className="size-4 fill-amber-400 text-amber-400" />
                                            <span className="font-semibold text-amber-400">
                                                {restaurant.rating}
                                            </span>
                                            <span className="text-neutral-500">
                                                ({restaurant.reviewCount})
                                            </span>
                                        </span>
                                        <span
                                            className={cn(
                                                "font-medium",
                                                status.isOpen
                                                    ? "text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                                                    : "text-red-600 bg-red-100 px-2 py-0.5 rounded-full",
                                            )}
                                        >
                                            {status.label}
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
                        <div className="mt-5 min-w-0 flex-1">
                            <div className="w-0 min-w-full overflow-hidden">
                                <div
                                    className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                    role="tablist"
                                    aria-label="Menu categories"
                                >
                                    {restaurant.categories.map((category) => {
                                        const isActive =
                                            activeCategory === category.id;
                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                role="tab"
                                                aria-selected={isActive}
                                                onClick={() =>
                                                    setActiveCategory(category.id)
                                                }
                                                className={cn(
                                                    "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-7 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
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
                            </div>

                            <div className="mt-5 flex gap-3">
                                <div className="relative min-w-0 flex-1">
                                    <Search
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
                                        aria-hidden
                                    />
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 shrink-0 gap-2 rounded-xl px-4"
                                >
                                    <SlidersHorizontal className="size-4" />
                                    Filter
                                </Button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <MenuProductCard
                                        key={product.id}
                                        product={product}
                                        quantity={quantities[product.id] ?? 0}
                                        onQuantityChange={(qty) =>
                                            setProductQuantity(product.id, qty)
                                        }
                                    />
                                ))}
                            </div>

                            {filteredProducts.length === 0 ? (
                                <p className="py-12 text-center text-neutral-500">
                                    No menu items match your search.
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
                                    <span className="text-sm text-neutral-600">
                                        Pages 1 of 1
                                    </span>
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
                    <Cart
                        businessName={restaurant.name}
                        cartCount={cartCount}
                        products={restaurant.products}
                        quantities={quantities}
                        onProductQuantityChange={setProductQuantity}
                    />

                </div>

                <Reviews
                    restaurantId={restaurantId}
                    rating={restaurant.rating}
                    reviewCount={restaurant.reviewCount}
                />
            </div>
        </div>
    );
}
