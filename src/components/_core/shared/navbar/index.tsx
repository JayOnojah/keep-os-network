"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import MobileDrawer from "./mobile-drawer";
import {
    desktopNavLinkClassName,
    isNavLinkActive,
    NAV_LINKS,
} from "./nav-links";
import RightNavItems from "./right-nav-items";
import Image from "next/image";
import { keepOSLogo } from "@/assets";

export function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const panelId = useId();

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const onChange = () => setOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
            <div className="app-width flex h-20 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center lg:px-8">
                <Link
                    href="/"
                    className="flex min-w-0 items-center gap-2 justify-self-start sm:gap-3"
                >
                    <Image
                        src={keepOSLogo}
                        alt="KeepOS Logo"
                        height={32}
                        width={155}

                        aria-hidden
                    />
                </Link>

                <nav
                    className="hidden items-center text-base justify-center text-[#020202] gap-8 font-medium md:flex"
                    aria-label="Main"
                >
                    {NAV_LINKS.map(({ href, label }) => {
                        const isActive = isNavLinkActive(pathname, href);
                        return (
                            <Link
                                key={label}
                                href={href}
                                className={desktopNavLinkClassName(isActive)}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <RightNavItems
                    open={open}
                    setOpen={setOpen}
                    panelId={panelId}
                />
            </div>

            <MobileDrawer
                open={open}
                setOpen={setOpen}
                panelId={panelId}
                navLinks={NAV_LINKS}
            />
        </header>
    );
}
