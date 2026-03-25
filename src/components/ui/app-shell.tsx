"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Handshake,
  User,
  Trophy,
  Flame,
  Sun,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar } from "./avatar";

interface NavItem {
  icon: typeof Home;
  label: string;
  href: string;
  match?: (path: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: "Feed", href: "/", match: (p) => p === "/" },
  { icon: Compass, label: "Explore", href: "/explore", match: (p) => p === "/explore" },
  { icon: Handshake, label: "Colabs", href: "/colabs", match: (p) => p === "/colabs" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard", match: (p) => p === "/leaderboard" },
  { icon: Flame, label: "Trending", href: "/trending", match: (p) => p === "/trending" },
];

function ThemeButton() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full text-foreground-sub transition-colors hover:bg-background-hover hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

interface AppShellProps {
  children: React.ReactNode;
  users: Array<{
    profile: {
      name: string;
      handle: string;
      avatarUrl: string;
      authorityScore: number;
      niche: string;
    };
  }>;
}

export function AppShell({ children, users }: AppShellProps) {
  const pathname = usePathname();
  const currentUser = users[0]; // Lena as "logged in" user for demo

  return (
    <div className="mx-auto flex min-h-screen max-w-[1280px]">
      {/* ═══ LEFT SIDEBAR ═══ */}
      <motion.aside
        className="sticky top-0 flex h-screen w-[72px] flex-col items-center justify-between border-r border-border py-6 lg:w-[240px] lg:items-stretch lg:px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-8 lg:items-stretch">
          <Link href="/" className="flex items-center gap-2 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-accent">
              <Flame size={16} className="text-white" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight text-foreground lg:block">
              The Hub
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.match
                ? item.match(pathname)
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-r px-3 py-2.5 transition-colors ${
                    isActive
                      ? "bg-accent-subtle text-accent"
                      : "text-foreground-sub hover:bg-background-hover hover:text-foreground"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={isActive ? "text-accent" : "text-foreground-sub group-hover:text-foreground"}
                  />
                  <span className="hidden text-sm font-medium lg:block">
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Profile link */}
            <Link
              href={`/creator/${currentUser.profile.handle.replace("@", "")}`}
              className={`group flex items-center gap-3 rounded-r px-3 py-2.5 transition-colors ${
                pathname.includes("/creator/lenavoss")
                  ? "bg-accent-subtle text-accent"
                  : "text-foreground-sub hover:bg-background-hover hover:text-foreground"
              }`}
            >
              <User
                size={20}
                className={
                  pathname.includes("/creator/lenavoss")
                    ? "text-accent"
                    : "text-foreground-sub group-hover:text-foreground"
                }
              />
              <span className="hidden text-sm font-medium lg:block">
                Profile
              </span>
            </Link>
          </nav>
        </div>

        {/* Bottom: Theme + User */}
        <div className="flex flex-col items-center gap-3 lg:items-stretch">
          <div className="flex justify-center">
            <ThemeButton />
          </div>

          {/* User pill */}
          <Link
            href={`/creator/${currentUser.profile.handle.replace("@", "")}`}
            className="flex items-center gap-3 rounded-r p-2 transition-colors hover:bg-background-hover"
          >
            <Avatar
              src={currentUser.profile.avatarUrl}
              alt={currentUser.profile.name}
              size="sm"
            />
            <div className="hidden flex-col lg:flex">
              <span className="text-sm font-medium text-foreground">
                {currentUser.profile.name}
              </span>
              <span className="text-xs text-foreground-ghost">
                {currentUser.profile.handle}
              </span>
            </div>
          </Link>
        </div>
      </motion.aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="min-h-screen flex-1">{children}</main>
    </div>
  );
}
