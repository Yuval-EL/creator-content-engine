"use client";

import { motion } from "framer-motion";
import { Sparkles, Image as ImageIcon, Link2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface ComposeBoxProps {
  currentUser: {
    name: string;
    avatarUrl: string;
  };
}

export function ComposeBox({ currentUser }: ComposeBoxProps) {
  return (
    <motion.div
      className="border-b border-border px-4 py-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-3">
        <Avatar
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          size="md"
        />
        <div className="flex-1">
          <div className="rounded-r border border-border bg-background-card px-4 py-3 text-sm text-foreground-ghost transition-colors hover:border-accent/30 cursor-text">
            What are you working on?
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground-ghost transition-colors hover:bg-accent-subtle hover:text-accent">
                <Sparkles size={14} />
                <span className="hidden sm:inline">Playbook</span>
              </button>
              <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground-ghost transition-colors hover:bg-accent-subtle hover:text-accent">
                <ImageIcon size={14} />
                <span className="hidden sm:inline">Media</span>
              </button>
              <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-foreground-ghost transition-colors hover:bg-accent-subtle hover:text-accent">
                <Link2 size={14} />
                <span className="hidden sm:inline">Link</span>
              </button>
            </div>
            <button className="rounded-r-full bg-accent px-5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover">
              Post
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
