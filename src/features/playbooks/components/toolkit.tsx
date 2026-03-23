"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  SlidersHorizontal,
  FileText,
  Palette,
  Code2,
  Copy,
  Check,
  Download,
} from "lucide-react";
import type { Asset } from "../types";

interface ToolkitProps {
  assets: Asset[];
}

const TYPE_META: Record<
  Asset["type"],
  { icon: typeof MessageSquare; label: string }
> = {
  prompt: { icon: MessageSquare, label: "Prompt" },
  preset: { icon: SlidersHorizontal, label: "Preset" },
  template: { icon: FileText, label: "Template" },
  lut: { icon: Palette, label: "LUT" },
  script: { icon: Code2, label: "Script" },
};

function AssetBlock({ asset, index }: { asset: Asset; index: number }) {
  const [copied, setCopied] = useState(false);
  const meta = TYPE_META[asset.type];
  const Icon = meta.icon;
  const isCopyable = !!asset.content;

  async function handleCopy() {
    if (!asset.content) return;
    await navigator.clipboard.writeText(asset.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      className="group/block flex flex-col gap-2 rounded-r border border-glass-border bg-glass p-4 backdrop-blur-sm transition-colors hover:bg-background-hover"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.4 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-r-sm bg-accent-subtle">
            <Icon size={13} className="text-accent" />
          </div>
          <div>
            <span className="block text-sm font-semibold text-foreground">
              {asset.label}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-foreground-ghost">
              {meta.label}
            </span>
          </div>
        </div>

        {/* Action button */}
        {isCopyable ? (
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm border border-glass-border bg-glass text-foreground-ghost transition-all hover:border-accent/30 hover:text-accent"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={14} className="text-success" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ) : (
          <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm border border-glass-border bg-glass text-foreground-ghost transition-all hover:border-accent/30 hover:text-accent">
            <Download size={14} />
          </button>
        )}
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-foreground-sub">
        {asset.description}
      </p>

      {/* Content preview for copyables */}
      {isCopyable && asset.content && (
        <div className="mt-1 max-h-20 overflow-hidden rounded-r-sm bg-background/60 px-3 py-2">
          <p className="line-clamp-3 font-mono text-[11px] leading-relaxed text-foreground-ghost">
            {asset.content}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function Toolkit({ assets }: ToolkitProps) {
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
        Toolkit
        <span className="ml-2 text-foreground-sub">
          {assets.length} asset{assets.length !== 1 && "s"}
        </span>
      </h3>
      {assets.map((asset, i) => (
        <AssetBlock key={asset.id} asset={asset} index={i} />
      ))}
    </motion.div>
  );
}
