"use client";

import { motion } from "framer-motion";
import { FeedEventCard } from "./feed-event";
import type { FeedEvent } from "../types";

interface SocialFeedProps {
  events: FeedEvent[];
}

export function SocialFeed({ events }: SocialFeedProps) {
  return (
    <section>
      <motion.div
        className="mb-6 flex items-baseline justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          Live Feed
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span className="text-xs text-foreground-sub">
            {events.length} events this week
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-4">
        {events.map((event, i) => (
          <FeedEventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
