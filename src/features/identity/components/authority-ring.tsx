"use client";

import { motion } from "framer-motion";

const SIZE = 200;
const STROKE = 6;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface AuthorityRingProps {
  score: number;
}

export function AuthorityRing({ score }: AuthorityRingProps) {
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--ac)" }}
      />

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="drop-shadow-[0_0_30px_rgba(108,99,255,0.15)]"
      >
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ac)" />
            <stop offset="100%" stopColor="var(--ac-hover)" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth={STROKE}
        />

        {/* Faint inner glow ring */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS - 12}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
          opacity={0.4}
        />

        {/* Progress arc */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-4xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
        >
          {score}
        </motion.span>
        <motion.span
          className="text-xs font-medium uppercase tracking-widest text-foreground-ghost"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          Authority
        </motion.span>
      </div>
    </div>
  );
}
