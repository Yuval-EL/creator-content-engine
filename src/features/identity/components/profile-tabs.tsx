"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileTabsProps {
  tabs: { id: string; label: string; count?: number }[];
  children: Record<string, React.ReactNode>;
}

export function ProfileTabs({ tabs, children }: ProfileTabsProps) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-0 z-10 flex border-b border-border bg-background/80 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative flex-1 px-4 py-3 text-xs font-medium transition-colors ${
              active === tab.id
                ? "text-foreground"
                : "text-foreground-ghost hover:text-foreground-sub"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-1.5 text-foreground-ghost">{tab.count}</span>
            )}
            {active === tab.id && (
              <motion.div
                layoutId="profileTab"
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-accent"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children[active]}
      </motion.div>
    </div>
  );
}
