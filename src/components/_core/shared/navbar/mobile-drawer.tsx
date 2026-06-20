"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { GemSvg } from "../svg";
import {
    isNavLinkActive,
    mobileNavLinkClassName,
    type NavLink,
} from "./nav-links";

type MobileDrawerProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    panelId: string;
    navLinks: readonly NavLink[];
    topOffset?: string;
};

export default function MobileDrawer({
    open,
    setOpen,
    panelId,
    navLinks,
    topOffset = "top-16",
}: MobileDrawerProps) {
    const pathname = usePathname();

    return (
        <div className="md:hidden" aria-hidden={!open}>
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-out",
                    topOffset,
                    open ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setOpen(false)}
            />
            <aside
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                aria-hidden={!open}
                inert={!open}
                className={cn(
                    "fixed bottom-0 left-0 z-50 flex w-[min(22rem,88vw)] max-w-full flex-col border-r border-neutral-100 bg-white shadow-xl transition-transform duration-300 ease-out",
                    topOffset,
                    open ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
                    <span className="text-sm font-semibold text-neutral-900">
                        Menu
                    </span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="shrink-0"
                        aria-label="Close menu"
                        onClick={() => setOpen(false)}
                    >
                        <X className="size-5" strokeWidth={2} />
                    </Button>
                </div>

                <nav
                    className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4"
                    aria-label="Mobile"
                    onClick={(e) => {
                        const t = e.target as HTMLElement;
                        if (t.closest("a")) setOpen(false);
                    }}
                >
                    {navLinks.map(({ href, label }) => {
                        const isActive = isNavLinkActive(pathname, href);
                        return (
                            <Link
                                key={label}
                                href={href}
                                className={mobileNavLinkClassName(isActive)}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {label}
                            </Link>
                        );
                    })}
                    <div className="mt-auto border-t border-neutral-100 pt-4">
                        <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-3 py-2 text-sm font-semibold text-primary">
                            <GemSvg />
                            <span>4,958 KPS</span>
                        </div>
                        <Button
                            variant="outline"
                            className="mt-3 w-full justify-center"
                            asChild
                        >
                            <Link
                                href="/explore/auth/login"
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                        </Button>
                        <Button
                            className="mt-2 w-full justify-center rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                            asChild
                        >
                            <Link
                                href="/explore/auth/register"
                                onClick={() => setOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                </nav>
            </aside>
        </div>
    );
}
