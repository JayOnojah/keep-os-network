import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hotel } from "lucide-react";
import {
    houseIcon,
    folderOpenIcon,
    shoppingCartIcon
} from "@/assets";
import { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

type Category = {
    title: string;
    description: string;
    cta: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    icon: StaticImageData;
    bg: string;
    border: string;
    accent: string;
    iconColor: string;
};

const CATEGORIES: Category[] = [
    {
        title: "Hotels",
        description: "Book comfortable stays from top-rated hotels.",
        cta: "Explore Hotels",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/hotels.png",
        imageAlt: "Modern hotel room with a comfortable bed",
        icon: houseIcon,
        bg: "bg-[#f3f4ff]",
        border: "border-primary",
        accent: "text-primary",
        iconColor: "text-primary",
    },
    {
        title: "Restaurants",
        description: "Delicious meals from your favorite spots.",
        cta: "Explore Restaurants",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/restaurants.png",
        imageAlt: "Plated meal with wine at a restaurant",
        icon: folderOpenIcon,
        bg: "bg-[#fff7ed]",
        border: "border-[#F88203]",
        accent: "text-[#ea580c]",
        iconColor: "text-[#ea580c]",
    },
    {
        title: "Supermarkets",
        description: "Groceries and essentials near you.",
        cta: "Explore Supermarkets",
        href: "#",
        imageSrc:
            "/images/pngs/landing-pages/shop-by-categories/supermarkets.png",
        imageAlt: "Supermarket aisle with fresh produce",
        icon: shoppingCartIcon,
        bg: "bg-[#f0fdf4]",
        border: "border-[#0D914D]",
        accent: "text-[#16a34a]",
        iconColor: "text-[#16a34a]",
    },
];

function CategoryCard({
    title,
    description,
    cta,
    href,
    imageSrc,
    imageAlt,
    icon: Icon,
    bg,
    border,
    accent,
}: Category) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between",
                bg,
                border,
            )}
        >
            {/* Text content */}
            <div className="flex flex-col gap-3 p-5 sm:min-h-44 sm:justify-between sm:px-6 sm:py-6">
                <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-neutral-100 bg-white sm:size-14">
                        <Image src={Icon} alt="" className="size-6" aria-hidden />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                            {title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                            {description}
                        </p>
                    </div>
                </div>
                <span
                    className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-semibold",
                        accent,
                    )}
                >
                    {cta}
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                    />
                </span>
            </div>

            {/* Image — full width on mobile, fixed size on desktop */}
            <div className="px-4 pb-4 sm:px-0 sm:pb-0 sm:pr-5">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    height={122}
                    width={142}
                    sizes="(max-width: 640px) 100vw, 142px"
                    className="w-full rounded-xl object-cover sm:w-[142px] sm:rounded-2xl"
                />
            </div>
        </Link>
    );
}

export function ShopByCategories() {
    return (
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="app-width">
                <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    Shop By Categories
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
                    {CATEGORIES.map((cat) => (
                        <CategoryCard key={cat.title} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
