"use client";

import { motion } from "framer-motion";
import type { CredBreakdown } from "../types";

interface CredRingProps {
  breakdown: CredBreakdown;
}

const SIZE = 240;
const STROKE = 7;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 8;

const SEGMENT_META = [
  { key: "vouches" as const, label: "Vouches", color: "var(--ac)" },
  { key: "remixes" as const, label: "Remixes", color: "var(--success)" },
  { key: "consistency" as const, label: "Consistency", color: "var(--info)" },
];

export function CredRing({ breakdown }: CredRingProps) {
  const { weights, scores, totalScore } = breakdown;
  const totalArc = (totalScore / 100) * CIRCUMFERENCE;

  // Compute each segment's arc length and rotation
  let cumulativeArc = 0;
  const segments = SEGMENT_META.map((meta) => {
    const rawArc = weights[meta.key] * totalArc;
    const arcLength = Math.max(rawArc - GAP, 0);
    const startAngle = -90 + (cumulativeArc / CIRCUMFERENCE) * 360;
    cumulativeArc += rawArc;

    return {
      ...meta,
      arcLength,
      rotation: startAngle,
      rawScore: scores[meta.key],
      weight: weights[meta.key],
    };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full opacity-15 blur-3xl"
          style={{ background: "var(--ac)" }}
        />

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="drop-shadow-[0_0_40px_rgba(108,99,255,0.12)]"
        >
          {/* Background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth={STROKE}
          />

          {/* Inner decorative ring */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS - 16}
            fill="none"
            stroke="var(--border)"
            strokeWidth={0.5}
            opacity={0.3}
          />

          {/* Segment arcs */}
          {segments.map((seg, i) => (
            <motion.circle
              key={seg.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${seg.arcLength} ${CIRCUMFERENCE - seg.arcLength}`}
              transform={`rotate(${seg.rotation} ${SIZE / 2} ${SIZE / 2})`}
              initial={{ strokeDashoffset: seg.arcLength }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3 + i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center">
          <motion.span
            className="text-5xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            {totalScore}
          </motion.span>
          <motion.span
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-ghost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Authority Score
          </motion.span>
        </div>
      </div>

      {/* Formula legend */}
      <motion.div
        className="flex gap-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        {segments.map((seg) => (
          <div key={seg.key} className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs font-medium text-foreground-sub">
                {seg.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">
                {seg.rawScore}
              </span>
              <span className="text-[10px] text-foreground-ghost">
                ×{Math.round(seg.weight * 100)}%
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
