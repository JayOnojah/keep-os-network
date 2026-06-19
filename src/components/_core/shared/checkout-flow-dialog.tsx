"use client";

import { type ReactNode, useState } from "react";
import {
    ArrowLeft,
    Box,
    CalendarDays,
    ChevronRight,
    MapPin,
    Search,
    ShoppingBag,
    Trash2,
    Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MOCK_KPS_BALANCE = 2000;
const KPS_CONVERSION_LABEL = "100 KPS ≈ ₦100";
const MOCK_WALLET_BALANCE = 200_000;

const DELIVERY_ADDRESSES = [
    "354 Solomon Lar road, Jabi, Abuja 900108, Federal Capital Territory, Nigeria",
    "354 Solomon Lar road, Jabi, Abuja 900108, Federal Capital Territory, Nigeria",
];

type CheckoutFlowDialogProps = {
    children: ReactNode;
    itemCount: number;
    businessName: string;
    subtotal: number;
    vat: number;
    total: number;
    formatPrice: (value: number) => string;
};

type CheckoutStep = "checkout" | "address" | "instructions" | "payment";
type PaymentMethod = "wallet" | "paystack";

function SummaryRows({
    subtotal,
    vat,
    total,
    formatPrice,
}: Pick<
    CheckoutFlowDialogProps,
    "subtotal" | "vat" | "total" | "formatPrice"
>) {
    return (
        <section className="mt-6">
            <h3 className="text-sm font-bold text-neutral-900">Summary</h3>
            <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-neutral-400">Sub total</dt>
                    <dd className="font-bold text-neutral-950">
                        {formatPrice(subtotal)}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <dt className="text-neutral-400">Vat</dt>
                    <dd className="font-bold text-neutral-950">
                        {formatPrice(vat)}
                    </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-4">
                    <dt className="text-neutral-500">Total</dt>
                    <dd className="text-xl font-bold text-neutral-950">
                        {formatPrice(total)}
                    </dd>
                </div>
            </dl>
        </section>
    );
}

function IconBubble({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
                className,
            )}
        >
            {children}
        </span>
    );
}

function RadioIndicator({ selected }: { selected: boolean }) {
    return (
        <span
            className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                selected ? "border-primary" : "border-neutral-400",
            )}
            aria-hidden
        >
            <span
                className={cn(
                    "size-2.5 rounded-full bg-primary transition-opacity",
                    selected ? "opacity-100" : "opacity-0",
                )}
            />
        </span>
    );
}

export default function CheckoutFlowDialog({
    children,
    itemCount,
    businessName,
    subtotal,
    vat,
    total,
    formatPrice,
}: CheckoutFlowDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<CheckoutStep>("checkout");
    const [useKps, setUseKps] = useState(false);
    const [kpsValue, setKpsValue] = useState("");
    const [deliveryInstruction, setDeliveryInstruction] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(
        DELIVERY_ADDRESSES[0],
    );
    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("wallet");

    const itemLabel = itemCount === 1 ? "product" : "products";

    function closeDialog(nextOpen: boolean) {
        setOpen(nextOpen);
        if (!nextOpen) {
            setStep("checkout");
        }
    }

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className={cn(
                    "max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-0",
                    step === "checkout"
                        ? "sm:max-w-[500px]"
                        : "sm:max-w-[630px]",
                )}
            >
                {step === "checkout" ? (
                    <div className="px-9 py-7">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-neutral-950">
                                Checkout
                            </DialogTitle>
                        </DialogHeader>

                        <p className="mt-2 text-sm text-neutral-400">
                            {itemCount} {itemLabel} from{" "}
                            <span className="font-bold text-neutral-900">
                                {businessName}
                            </span>
                        </p>

                        <section className="mt-5">
                            <h3 className="text-base font-bold text-neutral-900">
                                Delivery
                            </h3>
                            <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
                                <button
                                    type="button"
                                    onClick={() => setStep("address")}
                                    className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-neutral-50"
                                >
                                    <IconBubble>
                                        <MapPin className="size-5" />
                                    </IconBubble>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-xs text-neutral-400">
                                            Delivery address
                                        </span>
                                        <span className="mt-1 block text-sm font-bold leading-snug text-neutral-900">
                                            {selectedAddress}
                                        </span>
                                    </span>
                                    <ChevronRight className="size-5 shrink-0 text-neutral-700" />
                                </button>
                                <div className="mx-4 border-t border-neutral-200" />
                                <button
                                    type="button"
                                    onClick={() => setStep("instructions")}
                                    className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-neutral-50"
                                >
                                    <IconBubble>
                                        <CalendarDays className="size-5" />
                                    </IconBubble>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-bold text-neutral-900">
                                            Leave a note for rider
                                        </span>
                                        <span className="mt-1 block truncate text-xs text-neutral-400">
                                            {deliveryInstruction ||
                                                "Any instructions for smooth delivery"}
                                        </span>
                                    </span>
                                    <ChevronRight className="size-5 shrink-0 text-neutral-700" />
                                </button>
                            </div>
                        </section>

                        <section className="mt-6">
                            <h3 className="text-base font-bold text-neutral-900">
                                Discount
                            </h3>
                            <div className="mt-3 rounded-lg border border-neutral-200 p-4">
                                <div className="flex items-center gap-4">
                                    <IconBubble>
                                        <Box className="size-5" />
                                    </IconBubble>
                                    <span className="flex-1 text-sm font-bold text-neutral-900">
                                        Got KPS?
                                    </span>
                                    <Switch
                                        checked={useKps}
                                        onCheckedChange={setUseKps}
                                        aria-label="Use KPS discount"
                                    />
                                </div>

                                {useKps ? (
                                    <div className="mt-5">
                                        <div className="flex items-center justify-between gap-4 text-sm">
                                            <span className="text-neutral-900">
                                                Redeem Discount
                                            </span>
                                            <span className="text-xs text-neutral-400">
                                                Balance :{" "}
                                                <span className="font-bold">
                                                    {MOCK_KPS_BALANCE} KPS
                                                </span>
                                            </span>
                                        </div>
                                        <div className="mt-3 flex h-11 items-center rounded-lg border border-neutral-200">
                                            <Input
                                                value={kpsValue}
                                                onChange={(event) =>
                                                    setKpsValue(
                                                        event.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        ),
                                                    )
                                                }
                                                placeholder="Enter KPS Value"
                                                className="h-full flex-1 border-0 px-3 text-sm shadow-none focus-visible:ring-0"
                                            />
                                            <button
                                                type="button"
                                                className="shrink-0 px-4 text-sm font-bold text-primary"
                                            >
                                                Redeem
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-neutral-400">
                                            {KPS_CONVERSION_LABEL}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </section>

                        <SummaryRows
                            subtotal={subtotal}
                            vat={vat}
                            total={total}
                            formatPrice={formatPrice}
                        />

                        <Button
                            type="button"
                            onClick={() => setStep("payment")}
                            className="mt-6 h-11 w-full rounded-md text-base font-medium"
                        >
                            Checkout • {formatPrice(total)}
                        </Button>
                    </div>
                ) : null}

                {step === "address" ? (
                    <div className="px-9 py-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setStep("checkout")}
                                className="flex size-6 items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-100"
                                aria-label="Back to checkout"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                            <DialogTitle className="text-3xl font-bold text-neutral-950">
                                Delivery Address
                            </DialogTitle>
                        </div>

                        <div className="relative mt-7">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Search Address"
                                className="h-11 rounded-lg border-neutral-200 pl-11 text-base placeholder:text-neutral-400 focus-visible:ring-primary/20"
                            />
                        </div>

                        <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 px-4">
                            {DELIVERY_ADDRESSES.map((address, index) => (
                                <button
                                    key={`${address}-${index}`}
                                    type="button"
                                    onClick={() => {
                                        setSelectedAddress(address);
                                        setStep("checkout");
                                    }}
                                    className={cn(
                                        "flex w-full items-start gap-4 py-5 text-left",
                                        index > 0 &&
                                            "border-t border-neutral-200",
                                    )}
                                >
                                    <MapPin className="mt-0.5 size-6 shrink-0 text-primary" />
                                    <span className="min-w-0 flex-1 text-base font-bold leading-snug text-neutral-900">
                                        {address}
                                    </span>
                                    <Trash2 className="mt-1 size-5 shrink-0 text-red-500" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                {step === "instructions" ? (
                    <form
                        className="px-9 py-8"
                        onSubmit={(event) => {
                            event.preventDefault();
                            setStep("checkout");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setStep("checkout")}
                                className="flex size-6 items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-100"
                                aria-label="Back to checkout"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                            <DialogTitle className="text-3xl font-bold text-neutral-950">
                                Delivery Instructions
                            </DialogTitle>
                        </div>

                        <label
                            htmlFor="delivery-instructions"
                            className="mt-8 block text-sm text-neutral-900"
                        >
                            Any instructions for smooth delivery
                        </label>
                        <Textarea
                            id="delivery-instructions"
                            value={deliveryInstruction}
                            onChange={(event) =>
                                setDeliveryInstruction(event.target.value)
                            }
                            placeholder="Write your instructions..."
                            className="mt-3 min-h-48 resize-none rounded-lg border-neutral-200 px-4 py-4 text-base placeholder:text-neutral-400 focus-visible:ring-primary/20"
                        />

                        <Button
                            type="submit"
                            className="mt-9 h-12 w-full rounded-md text-lg font-medium"
                        >
                            Add Instructions
                        </Button>
                    </form>
                ) : null}

                {step === "payment" ? (
                    <div className="px-9 py-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-bold text-neutral-950">
                                Choose Payment Method
                            </DialogTitle>
                        </DialogHeader>

                        <section
                            className="mt-8 overflow-hidden rounded-lg border border-neutral-200 px-4"
                            role="radiogroup"
                            aria-label="Payment method"
                        >
                            <button
                                type="button"
                                role="radio"
                                aria-checked={paymentMethod === "wallet"}
                                onClick={() => setPaymentMethod("wallet")}
                                className="flex w-full items-center gap-4 py-5 text-left"
                            >
                                <IconBubble>
                                    <ShoppingBag className="size-5" />
                                </IconBubble>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-base font-bold text-neutral-900">
                                        Pay From Wallet
                                    </span>
                                    <span className="mt-2 block text-sm text-neutral-400">
                                        Wallet balance:{" "}
                                        <span className="font-bold">
                                            {formatPrice(MOCK_WALLET_BALANCE)}
                                        </span>
                                    </span>
                                </span>
                                <RadioIndicator
                                    selected={paymentMethod === "wallet"}
                                />
                            </button>
                            <div className="border-t border-neutral-200" />
                            <button
                                type="button"
                                role="radio"
                                aria-checked={paymentMethod === "paystack"}
                                onClick={() => setPaymentMethod("paystack")}
                                className="flex w-full items-center gap-4 py-5 text-left"
                            >
                                <IconBubble>
                                    <Wallet className="size-5" />
                                </IconBubble>
                                <span className="min-w-0 flex-1 text-base font-bold text-neutral-900">
                                    Pay with Paystack
                                </span>
                                <RadioIndicator
                                    selected={paymentMethod === "paystack"}
                                />
                            </button>
                        </section>

                        <SummaryRows
                            subtotal={subtotal}
                            vat={vat}
                            total={total}
                            formatPrice={formatPrice}
                        />

                        <Button
                            type="button"
                            className="mt-7 h-12 w-full rounded-md text-lg font-medium"
                        >
                            Proceed To Payment
                        </Button>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}
