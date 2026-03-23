"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import type { Chapter, Playbook } from "../types";

interface WalkthroughProps {
  chapters: Chapter[];
  duration: string;
  thumbnailGradient: string;
}

function parseTimestamp(ts: string): number {
  const parts = ts.split(":").map(Number);
  return parts.length === 3
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : parts[0] * 60 + parts[1];
}

function totalSeconds(duration: string): number {
  return parseTimestamp(duration);
}

export function Walkthrough({
  chapters,
  duration,
  thumbnailGradient,
}: WalkthroughProps) {
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>(chapters[0]?.id ?? "");
  const total = totalSeconds(duration);

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Video viewport */}
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-r border border-border"
        style={{ background: thumbnailGradient }}
      >
        {/* Scan lines (texture) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
          }}
        />

        {/* Play/Pause toggle */}
        <button
          onClick={() => setPlaying(!playing)}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
        >
          {playing ? (
            <Pause size={22} className="text-white/80" />
          ) : (
            <Play size={22} className="ml-1 text-white/80" />
          )}
        </button>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 rounded-r-sm bg-black/50 px-2 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
          {duration}
        </span>

        {/* Chapter progress bar */}
        <div className="absolute bottom-0 left-0 right-0 flex h-1">
          {chapters.map((ch, i) => {
            const nextStart =
              i < chapters.length - 1
                ? chapters[i + 1].timestampSeconds
                : total;
            const width = ((nextStart - ch.timestampSeconds) / total) * 100;

            return (
              <button
                key={ch.id}
                className={`h-full transition-colors ${
                  ch.id === activeChapter
                    ? "bg-accent"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                style={{ width: `${width}%` }}
                onClick={() => setActiveChapter(ch.id)}
                title={ch.title}
              />
            );
          })}
        </div>
      </div>

      {/* Chapter markers */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapter(ch.id)}
            className={`flex shrink-0 items-center gap-2 rounded-r border px-3 py-2 text-sm transition-all ${
              ch.id === activeChapter
                ? "border-accent/30 bg-accent-subtle text-foreground"
                : "border-glass-border bg-glass text-foreground-sub hover:bg-background-hover"
            }`}
          >
            <span className="font-mono text-xs text-foreground-ghost">
              {ch.timestamp}
            </span>
            <span className="truncate">{ch.title}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
