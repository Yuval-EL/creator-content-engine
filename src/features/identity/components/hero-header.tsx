"use client";

import { motion } from "framer-motion";
import { AuthorityRing } from "./authority-ring";
import { BadgeRibbon } from "./badge-ribbon";
import type { CreatorProfile } from "../types";

interface HeroHeaderProps {
  creator: CreatorProfile;
}

export function HeroHeader({ creator }: HeroHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-r2 border border-border bg-background-card p-8 md:p-10">
      {/* Subtle radial gradient behind the ring */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl" />

      {/* Top row: Identity + Ring */}
      <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left — Name & Niche */}
        <motion.div
          className="flex flex-col gap-2 text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {creator.name}
          </h1>
          <p className="text-sm font-medium text-accent">{creator.handle}</p>
          <p className="mt-1 text-base text-foreground-sub">{creator.niche}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-ghost">
            {creator.bio}
          </p>
        </motion.div>

        {/* Center/Right — Authority Ring */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <AuthorityRing score={creator.authorityScore} />
        </motion.div>
      </div>

      {/* Bottom — Badge Ribbon */}
      <div className="relative mt-8 border-t border-border pt-6">
        <BadgeRibbon badges={creator.badges} />
      </div>
    </section>
  );
}
