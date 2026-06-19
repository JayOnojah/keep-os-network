import Image from "next/image";

import { QuantityControl } from "../restaurant/quantity-control";

import { formatProductPrice, type SupermarketProduct } from "./data";

type ProductCardProps = {
    product: SupermarketProduct;
    quantity: number;
    onQuantityChange: (qty: number) => void;
};

export function ProductCard({
    product,
    quantity,
    onQuantityChange,
}: ProductCardProps) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white">
            <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover"
                />
            </div>
            <div className="flex justify-between items-end flex-1 gap-3 p-4">
                <div>
                    <h3 className="font-bold text-neutral-900 whitespace-nowrap">{product.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-neutral-800">
                        {formatProductPrice(product.price)}
                    </p>
                </div>
                <div className="">
                    <QuantityControl
                        quantity={quantity}
                        onDecrement={() =>
                            onQuantityChange(Math.max(0, quantity - 1))
                        }
                        onIncrement={() => onQuantityChange(quantity + 1)}
                    />
                </div>
            </div>
        </article>
    );
}
