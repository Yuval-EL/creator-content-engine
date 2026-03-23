"use client";

import { motion } from "framer-motion";
import type { StreakDay } from "../types";

interface CreationStreakProps {
  data: StreakDay[];
}

const INTENSITY_OPACITY = [0.06, 0.2, 0.4, 0.65, 1.0];
const BAR_MAX_HEIGHT = 36;
const BAR_MIN_HEIGHT = 4;

export function CreationStreak({ data }: CreationStreakProps) {
  const activeDays = data.filter((d) => d.intensity > 0).length;

  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          Creation Streak
        </h3>
        <span className="text-sm text-foreground-sub">
          <span className="font-semibold text-foreground">{activeDays}</span>{" "}
          active days
        </span>
      </div>

      {/* Waveform */}
      <div className="flex items-end gap-[3px] overflow-x-auto pb-1">
        {data.map((day, i) => {
          const height =
            day.intensity === 0
              ? BAR_MIN_HEIGHT
              : BAR_MIN_HEIGHT +
                (day.intensity / 4) * (BAR_MAX_HEIGHT - BAR_MIN_HEIGHT);

          return (
            <motion.div
              key={day.date}
              className="shrink-0 rounded-t-sm"
              style={{
                width: 6,
                height,
                backgroundColor: "var(--ac)",
                opacity: INTENSITY_OPACITY[day.intensity],
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.9 + i * 0.006,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </div>

      {/* Week labels */}
      <div className="mt-3 flex justify-between text-[10px] text-foreground-ghost">
        <span>13w ago</span>
        <span>9w ago</span>
        <span>5w ago</span>
        <span>This week</span>
      </div>
    </motion.section>
  );
}
