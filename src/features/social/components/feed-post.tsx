"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Handshake,
  Play,
  Package,
} from "lucide-react";
import type { FeedPost } from "../types";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

interface FeedPostCardProps {
  post: FeedPost;
  index: number;
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function FeedPostCard({ post, index }: FeedPostCardProps) {
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked ?? false);

  return (
    <motion.article
      className="border-b border-border px-4 py-5 transition-colors hover:bg-background-card/50 sm:px-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Main content row */}
      <div className="flex gap-3">
        {/* Author avatar */}
        <Link href={`/creator/${post.author.handle}`} className="shrink-0">
          <Avatar
            src={post.author.avatarUrl}
            alt={post.author.name}
            size="md"
            score={post.author.authorityScore}
          />
        </Link>

        <div className="min-w-0 flex-1">
          {/* Author name + time */}
          <div className="flex items-baseline gap-2">
            <Link
              href={`/creator/${post.author.handle}`}
              className="text-sm font-semibold text-foreground hover:underline"
            >
              {post.author.name}
            </Link>
            <span className="text-xs text-foreground-ghost">
              · {post.timeAgo}
            </span>
          </div>

          {/* Text content */}
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
            {post.content}
          </p>

          {/* Video thumbnail */}
          {post.video && (
            <div className="group mt-3 overflow-hidden rounded-r2 border border-border">
              <div
                className="relative flex h-48 items-center justify-center sm:h-64"
                style={{ background: post.video.thumbnailGradient }}
              >
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play size={24} className="ml-1 text-white" fill="white" />
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-3 right-3 rounded-r-sm bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
                  {post.video.duration}
                </span>
              </div>
              <div className="bg-background-card px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  {post.video.title}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-r-full bg-background-card px-2.5 py-0.5 text-[10px] font-medium text-foreground-ghost"
                >
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          )}

          {/* Related playbook */}
          {post.relatedPlaybook && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-foreground-ghost">
              <Package size={12} />
              <span>{post.relatedPlaybook}</span>
            </div>
          )}

          {/* ═══ INTERACTION BAR ═══ */}
          <div className="mt-3 flex items-center gap-1">
            {/* Like */}
            <button
              onClick={() => {
                setLiked(!liked);
                setLikeCount((c) => (liked ? c - 1 : c + 1));
              }}
              className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
                liked
                  ? "text-error"
                  : "text-foreground-ghost hover:bg-error/10 hover:text-error"
              }`}
            >
              <Heart
                size={15}
                className={liked ? "fill-error" : ""}
              />
              <span>{fmt(likeCount)}</span>
            </button>

            {/* Comments */}
            <button className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground-ghost transition-colors hover:bg-info/10 hover:text-info">
              <MessageCircle size={15} />
              <span>{fmt(post.comments)}</span>
            </button>

            {/* Colab */}
            <button
              className="group flex items-center justify-center rounded-full px-2 py-1.5 text-foreground-ghost transition-colors hover:bg-accent-subtle hover:text-accent"
              title="Pitch a Colab"
            >
              <Handshake size={15} />
            </button>

            {/* Share */}
            <button className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground-ghost transition-colors hover:bg-success/10 hover:text-success">
              <Share2 size={15} />
              <span>{fmt(post.shares)}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`group ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors ${
                bookmarked
                  ? "text-accent"
                  : "text-foreground-ghost hover:bg-accent-subtle hover:text-accent"
              }`}
            >
              <Bookmark
                size={15}
                className={bookmarked ? "fill-accent" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
