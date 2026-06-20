import type { ReactNode, SVGProps } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { keepOSLogo } from "@/assets";
import Link from "next/link";

function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.7-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}

const EXPLORE_LINKS = [
  { label: "Hotels", href: "#" },
  { label: "Restaurants", href: "#" },
  { label: "Supermarkets", href: "#" },
] as const;

const COMPANY_LINKS = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Contact Us", href: "#" },
] as const;

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const;

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900"
    >
      {children}
    </a>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { readonly label: string; readonly href: string }[];
}) {
  return (
    <div className="min-w-0 lg:border-l lg:border-[#C0C9EA] lg:pl-10">
      <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f0f2ff]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-0">
          <div className="border-b border-[#C0C9EA] pb-10 lg:border-b-0 lg:pb-0 lg:pr-10">
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
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-600">
              Discover trusted hotels, restaurants, and supermarkets near you.
              Earn points. Get rewards.
            </p>
            <p className="mt-8 text-sm font-bold text-neutral-900">Follow Us</p>
            <div className="mt-3 flex gap-3">
              <SocialIcon href="#" label="Facebook">
                <IconFacebook className="size-4.5" />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <IconInstagram className="size-4.5" />
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <X className="size-3.75" strokeWidth={2} />
              </SocialIcon>
            </div>
          </div>

          <LinkColumn title="Explore" links={EXPLORE_LINKS} />
          <LinkColumn title="Company" links={COMPANY_LINKS} />
          <LinkColumn title="Support" links={SUPPORT_LINKS} />
        </div>

        <div className="mt-12 border-t border-[#C0C9EA] pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm text-neutral-600">
            <span>© 2026 KeepOS.network. All rights reserved.</span>
            <span
              className="hidden h-3 w-px shrink-0 bg-[#C0C9EA] sm:block"
              aria-hidden
            />
            <span>Built for local businesses.</span>
            <span
              className="hidden h-3 w-px shrink-0 bg-[#C0C9EA] sm:block"
              aria-hidden
            />
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
