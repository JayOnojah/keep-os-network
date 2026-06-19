import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { shopingCartFullIcon } from "@/assets";
import CheckoutFlowDialog from "@/components/_core/shared/checkout-flow-dialog";
import {
    formatMenuPrice,
    formatMenuPriceDecimal,
    type MenuProduct,
} from "./data";

const VAT_RATE = 0.075;

type CartProps = {
    businessName: string;
    cartCount: number;
    products: MenuProduct[];
    quantities: Record<string, number>;
    onProductQuantityChange: (productId: string, quantity: number) => void;
};

function CartQuantityStepper({
    quantity,
    onDecrement,
    onIncrement,
}: {
    quantity: number;
    onDecrement: () => void;
    onIncrement: () => void;
}) {
    return (
        <div className="flex items-center rounded-lg border border-neutral-200 bg-white">
            <button
                type="button"
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="flex size-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease quantity"
            >
                <Minus className="size-4" />
            </button>
            <span className="min-w-8 border-x border-neutral-200 px-2 py-2 text-center text-sm font-semibold text-neutral-900">
                {quantity}
            </span>
            <button
                type="button"
                onClick={onIncrement}
                className="flex size-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-50"
                aria-label="Increase quantity"
            >
                <Plus className="size-4" />
            </button>
        </div>
    );
}

function CartItemCard({
    product,
    quantity,
    onQuantityChange,
    onRemove,
}: {
    product: MenuProduct;
    quantity: number;
    onQuantityChange: (qty: number) => void;
    onRemove: () => void;
}) {
    return (
        <li className="rounded-xl border border-neutral-200/90 bg-white p-4">
            <div className="flex gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="56px"
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-neutral-900">{product.name}</p>
                    <p className="mt-0.5 text-sm text-neutral-500">
                        {formatMenuPriceDecimal(product.price)}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm text-neutral-500">Quantity</span>
                <CartQuantityStepper
                    quantity={quantity}
                    onDecrement={() =>
                        onQuantityChange(Math.max(1, quantity - 1))
                    }
                    onIncrement={() => onQuantityChange(quantity + 1)}
                />
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-neutral-200/80"
            >
                <Trash2 className="size-4" />
                Remove
            </button>
        </li>
    );
}

export default function Cart({
    businessName,
    cartCount,
    products,
    quantities,
    onProductQuantityChange,
}: CartProps) {
    const cartItems = products.filter((p) => (quantities[p.id] ?? 0) > 0);

    const subtotal = cartItems.reduce(
        (sum, product) =>
            sum + product.price * (quantities[product.id] ?? 0),
        0,
    );
    const vat = Math.round(subtotal * VAT_RATE);
    const total = subtotal + vat;

    return (
        <aside className="flex w-full shrink-0 flex-col lg:sticky lg:top-24 lg:w-80 lg:max-h-[calc(100vh-6rem)]">
            <div className="flex max-h-[min(70vh,40rem)] min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white lg:max-h-full lg:flex-1">
                <div className="shrink-0 px-6 pt-6">
                    {cartCount > 0 ? (
                        <h2 className="text-lg font-bold text-neutral-900">
                            Your Orders
                        </h2>
                    ) : null}
                </div>

                {cartCount === 0 ? (
                    <div className="flex flex-col items-center px-6 py-50 text-center">
                        <Image
                            src={shopingCartFullIcon}
                            alt="Shopping Cart Full"
                            width={64}
                            height={64}
                        />
                        <h2 className="mt-4 text-lg font-bold text-neutral-900">
                            Your Orders
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                            When you add products from a store, they will appear
                            here
                        </p>
                    </div>
                ) : (
                    <div className="flex min-h-0 flex-1 flex-col">
                        <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-6 py-5 [-ms-overflow-style:none] scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300">
                            {cartItems.map((product) => {
                                const quantity = quantities[product.id] ?? 0;
                                return (
                                    <CartItemCard
                                        key={product.id}
                                        product={product}
                                        quantity={quantity}
                                        onQuantityChange={(qty) =>
                                            onProductQuantityChange(
                                                product.id,
                                                qty,
                                            )
                                        }
                                        onRemove={() =>
                                            onProductQuantityChange(
                                                product.id,
                                                0,
                                            )
                                        }
                                    />
                                );
                            })}
                        </ul>

                        <div className="shrink-0 border-t border-neutral-100 bg-white px-6 pb-6 pt-4">
                            <section>
                                <h3 className="text-base font-bold text-neutral-900">
                                    Summary
                                </h3>
                                <dl className="mt-3 space-y-2.5 text-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-neutral-600">
                                            Sub total
                                        </dt>
                                        <dd className="font-bold text-neutral-900">
                                            {formatMenuPrice(subtotal)}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-neutral-600">Vat</dt>
                                        <dd className="font-bold text-neutral-900">
                                            {formatMenuPrice(vat)}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-3">
                                        <dt className="font-medium text-neutral-900">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-neutral-900">
                                            {formatMenuPrice(total)}
                                        </dd>
                                    </div>
                                </dl>
                            </section>

                            <CheckoutFlowDialog
                                itemCount={cartCount}
                                businessName={businessName}
                                subtotal={subtotal}
                                vat={vat}
                                total={total}
                                formatPrice={formatMenuPrice}
                            >
                                <Button
                                    type="button"
                                    className="mt-6 h-12 w-full rounded-xl text-base font-semibold"
                                >
                                    Place Order
                                </Button>
                            </CheckoutFlowDialog>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
