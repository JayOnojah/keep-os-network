import { Minus, Plus } from "lucide-react";

type QuantityControlProps = {
    quantity: number;
    onDecrement: () => void;
    onIncrement: () => void;
};

export function QuantityControl({
    quantity,
    onDecrement,
    onIncrement,
}: QuantityControlProps) {
    if (quantity === 0) {
        return (
            <button
                type="button"
                onClick={onIncrement}
                className="flex size-10 cursor-pointer bg-primary/10 border border-primary text-primary items-center justify-center rounded-full transition-colors"
                
                aria-label="Add to order"
            >
                <Plus className="size-4" />
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-1 py-1">
            <button
                type="button"
                onClick={onDecrement}
                className="flex size-7 cursor-pointer items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-primary/10"
                aria-label="Decrease quantity"
            >
                <Minus className="size-3.5" />
            </button>
            <span className="min-w-4 text-center text-sm font-semibold text-neutral-900">
                {quantity}
            </span>
            <button
                type="button"
                onClick={onIncrement}
                className="flex size-7 cursor-pointer hover:bg-primary/10 items-center justify-center rounded-full  text-neutral-900 transition-colors"
                aria-label="Increase quantity"
            >
                <Plus className="size-3.5" />
            </button>
        </div>
    );
}
