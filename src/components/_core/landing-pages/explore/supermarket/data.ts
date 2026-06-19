import { EXPLORE_BUSINESSES, type Business, type FooterState } from "../data";

export type ProductCategory = {
    id: string;
    label: string;
    imageSrc: string;
};

export type SupermarketProduct = {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    categoryId: string;
};

export type SupermarketDetail = Business & {
    slug: string;
    categories: ProductCategory[];
    products: SupermarketProduct[];
};

const SUPERMARKET_CATEGORY_IMAGE =
    "/images/pngs/landing-pages/shop-by-categories/supermarkets.png";

const CATEGORY_IMAGES: Record<string, string> = {
    "fresh-produce": SUPERMARKET_CATEGORY_IMAGE,
    beverages: SUPERMARKET_CATEGORY_IMAGE,
    household: SUPERMARKET_CATEGORY_IMAGE,
    snacks: SUPERMARKET_CATEGORY_IMAGE,
    "frozen-foods": SUPERMARKET_CATEGORY_IMAGE,
    bakery: SUPERMARKET_CATEGORY_IMAGE,
};

const CATEGORY_LABELS: Record<string, string> = {
    "fresh-produce": "Fresh Produce",
    beverages: "Beverages",
    household: "Household",
    snacks: "Snacks",
    "frozen-foods": "Frozen Foods",
    bakery: "Bakery",
};

const DEFAULT_CATEGORY_IDS = [
    "fresh-produce",
    "beverages",
    "household",
    "snacks",
    "frozen-foods",
    "bakery",
];

const PRODUCT_NAMES = [
    "Peak Milk 1L",
    "Golden Morn 900g",
    "Fresh Tomatoes 1kg",
    "Indomie Chicken 70g",
    "Dangote Sugar 1kg",
    "Golden Penny Spaghetti",
    "Coca-Cola 50cl",
    "Dettol Soap 3-Pack",
    "Frozen Chicken 1kg",
    "Bread Loaf",
    "Basmati Rice 5kg",
    "Bottled Water 1.5L",
];

function buildCategories(supermarket: Business): ProductCategory[] {
    const categoryIds = supermarket.productCategories?.length
        ? [...new Set([...DEFAULT_CATEGORY_IDS, ...supermarket.productCategories])]
        : DEFAULT_CATEGORY_IDS;

    const categories = categoryIds
        .map((id) => {
            const label = CATEGORY_LABELS[id];
            if (!label) return null;
            return {
                id,
                label,
                imageSrc: CATEGORY_IMAGES[id] ?? supermarket.imageSrc,
            };
        })
        .filter((category): category is ProductCategory => category !== null);

    return [
        {
            id: "all",
            label: "All",
            imageSrc: supermarket.imageSrc,
        },
        ...categories,
    ];
}

function buildProducts(supermarket: Business): SupermarketProduct[] {
    const categoryIds = supermarket.productCategories?.length
        ? supermarket.productCategories
        : DEFAULT_CATEGORY_IDS;

    return Array.from({ length: 12 }, (_, index) => ({
        id: `${supermarket.id}-product-${index + 1}`,
        name: PRODUCT_NAMES[index % PRODUCT_NAMES.length] ?? supermarket.name,
        price: 4500 + (index % 4) * 500,
        imageSrc: supermarket.imageSrc,
        imageAlt: supermarket.imageAlt,
        categoryId: categoryIds[index % categoryIds.length] ?? "fresh-produce",
    }));
}

export function getSupermarketById(id: string): SupermarketDetail | undefined {
    const business = EXPLORE_BUSINESSES.find(
        (entry) => entry.id === id && entry.category === "Supermarket",
    );
    if (!business) return undefined;

    return {
        ...business,
        slug: id,
        categories: buildCategories(business),
        products: buildProducts(business),
    };
}

export function formatProductPrice(value: number) {
    return `₦${value.toLocaleString("en-NG")}`;
}

export function formatProductPriceDecimal(value: number) {
    return `₦${value.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

export function getSupermarketStatus(footer: FooterState) {
    if (footer.type === "open") {
        return { label: `Open • Closes ${footer.closesAt}`, isOpen: true };
    }
    if (footer.type === "closed") {
        return { label: "Closed", isOpen: false };
    }
    return { label: footer.label, isOpen: true };
}
