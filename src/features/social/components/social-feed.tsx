"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FeedEventCard } from "./feed-event";
import { FeedPostCard } from "./feed-post";
import { ComposeBox } from "./compose-box";
import type { FeedEvent, FeedPost } from "../types";

interface SocialFeedProps {
  events: FeedEvent[];
  posts: FeedPost[];
  currentUser: {
    name: string;
    avatarUrl: string;
  };
}

const TABS = [
  { id: "feed", label: "Feed" },
  { id: "updates", label: "Updates" },
] as const;

export function SocialFeed({ events, posts, currentUser }: SocialFeedProps) {
  const [activeTab, setActiveTab] = useState<string>("feed");

  return (
    <section className="border-x border-border">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
          <h1 className="text-lg font-bold text-foreground">Feed</h1>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-xs text-foreground-sub">Live</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 px-4 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-foreground-ghost hover:text-foreground-sub"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="feedTab"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-accent"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Compose — only on Feed tab */}
      {activeTab === "feed" && <ComposeBox currentUser={currentUser} />}

      {/* Content */}
      <div>
        {activeTab === "feed" &&
          posts.map((post, i) => (
            <FeedPostCard key={post.id} post={post} index={i} />
          ))}

        {activeTab === "updates" &&
          events.map((event, i) => (
            <FeedEventCard key={event.id} event={event} index={i} />
          ))}
      </div>
    </section>
  );
}
