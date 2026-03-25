"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Handshake, Sparkles, Zap, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface ColabPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  from: {
    name: string;
    handle: string;
    avatarUrl: string;
    authorityScore: number;
    niche: string;
    colabInterests?: string[];
  };
  to: {
    name: string;
    handle: string;
    avatarUrl: string;
    authorityScore: number;
    niche: string;
    colabInterests?: string[];
  };
}

function findSynergies(
  fromNiche: string,
  toNiche: string,
  fromInterests?: string[],
  toInterests?: string[],
): string[] {
  const synergies: string[] = [];
  const fromWords = fromNiche.toLowerCase();
  const toWords = toNiche.toLowerCase();

  if (fromWords.includes("film") || toWords.includes("film"))
    synergies.push("Film Production");
  if (fromWords.includes("sound") || toWords.includes("sound"))
    synergies.push("Sound Design");
  if (fromWords.includes("edit") || toWords.includes("edit"))
    synergies.push("Editing");
  if (fromWords.includes("ai") || toWords.includes("ai"))
    synergies.push("AI Integration");
  if (fromWords.includes("vfx") || toWords.includes("vfx"))
    synergies.push("Visual Effects");
  if (fromWords.includes("visual") || toWords.includes("visual"))
    synergies.push("Visual Storytelling");

  // Cross-reference interests
  if (fromInterests && toInterests) {
    for (const fi of fromInterests) {
      for (const ti of toInterests) {
        const a = fi.toLowerCase();
        const b = ti.toLowerCase();
        if (
          a.split(" ").some((w) => w.length > 3 && b.includes(w)) &&
          !synergies.includes(fi)
        ) {
          synergies.push(fi);
        }
      }
    }
  }

  return synergies.slice(0, 4);
}

export function ColabPitchModal({
  isOpen,
  onClose,
  from,
  to,
}: ColabPitchModalProps) {
  const [vision, setVision] = useState("");
  const [sent, setSent] = useState(false);

  const synergies = findSynergies(
    from.niche,
    to.niche,
    from.colabInterests,
    to.colabInterests,
  );

  const handleSend = () => {
    if (!vision.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setVision("");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-full max-w-lg rounded-r2 border border-border bg-background shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <Handshake size={18} className="text-accent" />
                  <h2 className="text-sm font-bold text-foreground">
                    Pitch a Colab
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-ghost transition-colors hover:bg-background-hover hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Creator Connection Visual */}
              <div className="flex items-center justify-center gap-4 border-b border-border px-6 py-5">
                <div className="flex flex-col items-center gap-1">
                  <Avatar
                    src={from.avatarUrl}
                    alt={from.name}
                    size="lg"
                    score={from.authorityScore}
                  />
                  <span className="mt-1 text-xs font-medium text-foreground">
                    {from.name}
                  </span>
                  <span className="text-[10px] text-foreground-ghost">
                    {from.handle}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap size={24} className="text-accent" />
                  </motion.div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                    Colab
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <Avatar
                    src={to.avatarUrl}
                    alt={to.name}
                    size="lg"
                    score={to.authorityScore}
                  />
                  <span className="mt-1 text-xs font-medium text-foreground">
                    {to.name}
                  </span>
                  <span className="text-[10px] text-foreground-ghost">
                    {to.handle}
                  </span>
                </div>
              </div>

              {/* Skill Synergies */}
              {synergies.length > 0 && (
                <div className="border-b border-border px-6 py-4">
                  <div className="mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-warning" />
                    <span className="text-xs font-semibold text-foreground-sub">
                      Potential Synergies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {synergies.map((s) => (
                      <span
                        key={s}
                        className="rounded-r-full border border-accent/20 bg-accent-subtle px-3 py-1 text-[11px] font-medium text-accent"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colab Interests of target */}
              {to.colabInterests && to.colabInterests.length > 0 && (
                <div className="border-b border-border px-6 py-4">
                  <p className="mb-2 text-xs text-foreground-ghost">
                    {to.name} is looking to colab on:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {to.colabInterests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-r-full border border-border bg-background-card px-3 py-1 text-[11px] text-foreground-sub"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Vision Input */}
              <div className="px-6 py-4">
                <label className="mb-2 block text-xs font-semibold text-foreground-sub">
                  Your colab vision
                </label>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder={`What could you and ${to.name} create together? Be specific — what would the output look like?`}
                  className="h-28 w-full resize-none rounded-r border border-border bg-background-card px-4 py-3 text-sm text-foreground placeholder:text-foreground-ghost focus:border-accent/40 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <p className="text-[10px] text-foreground-ghost">
                  Colabs appear in both profiles and the feed
                </p>
                <button
                  onClick={handleSend}
                  disabled={!vision.trim() || sent}
                  className={`flex items-center gap-2 rounded-r-full px-5 py-2 text-xs font-semibold transition-all ${
                    sent
                      ? "bg-success text-white"
                      : vision.trim()
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "cursor-not-allowed bg-border text-foreground-ghost"
                  }`}
                >
                  {sent ? (
                    <>
                      <Handshake size={14} />
                      <span>Pitch Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Pitch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
