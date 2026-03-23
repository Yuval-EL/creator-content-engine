"use client";

import { motion } from "framer-motion";
import { Walkthrough } from "./walkthrough";
import { Toolkit } from "./toolkit";
import { EvolutionTimeline } from "./evolution-timeline";
import { RemixButton } from "./remix-button";
import type { Playbook } from "../types";

interface ProjectBoxProps {
  playbook: Playbook;
}

export function ProjectBox({ playbook }: ProjectBoxProps) {
  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Box header */}
      <div className="flex flex-col gap-1">
        <motion.h2
          className="text-2xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {playbook.title}
        </motion.h2>
        <motion.p
          className="max-w-2xl text-sm leading-relaxed text-foreground-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {playbook.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="mt-3 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {playbook.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-r-full border border-glass-border bg-glass px-3 py-1 text-xs text-foreground-ghost"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main content: Walkthrough + Toolkit sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Walkthrough — wider */}
        <div className="lg:col-span-3">
          <Walkthrough
            chapters={playbook.chapters}
            duration={playbook.duration}
            thumbnailGradient={playbook.thumbnailGradient}
          />
        </div>

        {/* Toolkit sidebar — narrower */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Toolkit assets={playbook.assets} />
          <RemixButton
            playbookTitle={playbook.title}
            remixCount={playbook.remixCount}
          />
        </div>
      </div>

      {/* Evolution Timeline */}
      <EvolutionTimeline versions={playbook.versions} />
    </motion.div>
  );
}
