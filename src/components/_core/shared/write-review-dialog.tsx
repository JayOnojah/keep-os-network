"use client";

import {
    type ChangeEvent,
    type DragEvent,
    type FormEvent,
    type ReactNode,
    useId,
    useMemo,
    useState,
} from "react";
import { ImageIcon, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const RATING_LABELS = ["Poor", "Fair", "Okay", "Good!", "Excellent!"];

type WriteReviewDialogProps = {
    children: ReactNode;
    onSubmit?: (review: {
        rating: number;
        text: string;
        photos: File[];
    }) => void;
};

export default function WriteReviewDialog({
    children,
    onSubmit,
}: WriteReviewDialogProps) {
    const uploadInputId = useId();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const activeRating = hoverRating || rating;
    const canSubmit = rating > 0 && reviewText.trim().length > 0;

    const photoNames = useMemo(
        () => photos.map((photo) => `${photo.name}-${photo.size}`),
        [photos],
    );

    function addPhotos(fileList: FileList | File[]) {
        const imageFiles = Array.from(fileList).filter((file) =>
            file.type.startsWith("image/"),
        );

        setPhotos((currentPhotos) => {
            const existingPhotoNames = new Set(
                currentPhotos.map((photo) => `${photo.name}-${photo.size}`),
            );
            const nextPhotos = imageFiles.filter(
                (photo) => !existingPhotoNames.has(`${photo.name}-${photo.size}`),
            );
            return [...currentPhotos, ...nextPhotos].slice(0, 6);
        });
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            addPhotos(event.target.files);
        }
        event.target.value = "";
    }

    function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setIsDragging(false);
        addPhotos(event.dataTransfer.files);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!canSubmit) return;

        onSubmit?.({
            rating,
            text: reviewText.trim(),
            photos,
        });

        setRating(0);
        setHoverRating(0);
        setReviewText("");
        setPhotos([]);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="gap-0 rounded-2xl p-0 sm:max-w-[552px]">
                <form onSubmit={handleSubmit} className="px-8 pb-5 pt-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-neutral-900">
                            Write a Review & Earn KPS
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-6">
                        <Label className="text-xs font-medium text-neutral-900">
                            How would you rate your experience?
                        </Label>
                        <div
                            className="mt-2 flex items-center gap-1.5"
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            {RATING_LABELS.map((label, index) => {
                                const value = index + 1;
                                const isActive = value <= activeRating;

                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        aria-label={`${value} star${value === 1 ? "" : "s"} - ${label}`}
                                        aria-pressed={rating === value}
                                        onClick={() => setRating(value)}
                                        onFocus={() => setHoverRating(value)}
                                        onBlur={() => setHoverRating(0)}
                                        onMouseEnter={() => setHoverRating(value)}
                                        className="flex size-5 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                    >
                                        <Star
                                            className={cn(
                                                "size-5 transition-colors",
                                                isActive
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "fill-neutral-400 text-neutral-400",
                                            )}
                                        />
                                    </button>
                                );
                            })}
                            {activeRating > 0 ? (
                                <span className="ml-1 text-xs text-neutral-500">
                                    {RATING_LABELS[activeRating - 1]}
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label
                            htmlFor="review-text"
                            className="text-xs font-medium text-neutral-900"
                        >
                            Tell us about your experience
                        </Label>
                        <Textarea
                            id="review-text"
                            value={reviewText}
                            onChange={(event) => setReviewText(event.target.value)}
                            placeholder="Write your review..."
                            className="mt-2 min-h-36 resize-none rounded-lg border-neutral-200 px-4 py-4 text-sm placeholder:text-neutral-400 focus-visible:border-primary focus-visible:ring-primary/20"
                        />
                    </div>

                    <div className="mt-6">
                        <Label className="text-sm font-normal leading-snug text-neutral-900">
                            Upload photos from your visit to verify your
                            experience and earn points.
                        </Label>
                        <input
                            id={uploadInputId}
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor={uploadInputId}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={cn(
                                "mt-2 flex min-h-30 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 px-4 py-6 text-center transition-colors",
                                isDragging &&
                                    "border-primary bg-primary/5 text-primary",
                            )}
                        >
                            <ImageIcon className="size-8 text-neutral-700" />
                            <span className="mt-3 text-sm text-neutral-900">
                                Drop your images here, or{" "}
                                <span className="text-primary">
                                    click to upload
                                </span>
                            </span>
                            <span className="mt-1 text-xs text-neutral-500">
                                1600 × 1200 (4:3) recommended
                            </span>
                        </label>

                        {photos.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                {photos.map((photo, index) => (
                                    <li
                                        key={photoNames[index]}
                                        className="flex items-center justify-between gap-3 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700"
                                    >
                                        <span className="min-w-0 truncate">
                                            {photo.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setPhotos((currentPhotos) =>
                                                    currentPhotos.filter(
                                                        (_, photoIndex) =>
                                                            photoIndex !== index,
                                                    ),
                                                )
                                            }
                                            className="flex size-6 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
                                            aria-label={`Remove ${photo.name}`}
                                        >
                                            <X className="size-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-12 h-10 w-full rounded-md text-sm font-medium"
                    >
                        Submit Review
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
