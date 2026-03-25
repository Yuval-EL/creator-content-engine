"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, LinkIcon, Handshake } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ColabPitchModal } from "@/features/social/components/colab-pitch-modal";
import type { CreatorProfile } from "../types";
import { BadgeRibbon } from "./badge-ribbon";

interface ProfileHeaderProps {
  creator: CreatorProfile;
  currentUser?: CreatorProfile;
}

function fmt(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

export function ProfileHeader({ creator, currentUser }: ProfileHeaderProps) {
  const [showColabPitch, setShowColabPitch] = useState(false);
  const isOwnProfile = currentUser?.id === creator.id;

  return (
    <section>
      {/* Cover Banner */}
      <motion.div
        className="relative h-36 sm:h-48"
        style={{ background: creator.coverGradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </motion.div>

      {/* Profile Info */}
      <div className="relative border-b border-border px-4 pb-4 sm:px-6">
        {/* Avatar — overlapping the cover */}
        <div className="-mt-12 mb-3 flex items-end justify-between sm:-mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Avatar
              src={creator.avatarUrl}
              alt={creator.name}
              size="xl"
              ring
              score={creator.authorityScore}
            />
          </motion.div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            {!isOwnProfile && (
              <button
                onClick={() => setShowColabPitch(true)}
                className="flex items-center gap-1.5 rounded-r-full border border-accent/30 bg-accent-subtle px-4 py-1.5 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-white"
              >
                <Handshake size={13} />
                Colab
              </button>
            )}
            <button className="rounded-r-full bg-foreground px-5 py-1.5 text-xs font-semibold text-background transition-colors hover:opacity-90">
              Follow
            </button>
          </div>
        </div>

        {/* Name + Handle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h1 className="text-xl font-bold text-foreground">{creator.name}</h1>
          <p className="text-sm text-foreground-ghost">{creator.handle}</p>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="mt-2 max-w-lg text-sm leading-relaxed text-foreground-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {creator.bio}
        </motion.p>

        {/* Niche + Meta */}
        <motion.div
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground-ghost"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {creator.niche}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            Joined 2025
          </span>
          <span className="flex items-center gap-1">
            <LinkIcon size={12} />
            thehub.io/{creator.handle.replace("@", "")}
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-3 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {fmt(creator.following)}
            </strong>{" "}
            <span className="text-foreground-ghost">Following</span>
          </span>
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {fmt(creator.followers)}
            </strong>{" "}
            <span className="text-foreground-ghost">Followers</span>
          </span>
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {creator.vouches.length}
            </strong>{" "}
            <span className="text-foreground-ghost">Vouches</span>
          </span>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          <BadgeRibbon badges={creator.badges} />
        </motion.div>

        {/* Open to Colab signal */}
        {creator.openToColab && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-r-full border border-accent/20 bg-accent-subtle px-3 py-1">
                <Handshake size={12} className="text-accent" />
                <span className="text-[11px] font-semibold text-accent">
                  Open to Colab
                </span>
              </span>
              {creator.colabInterests && creator.colabInterests.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {creator.colabInterests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-r-full border border-border bg-background-card px-2.5 py-1 text-[10px] text-foreground-ghost"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Colab Pitch Modal */}
      {currentUser && !isOwnProfile && (
        <ColabPitchModal
          isOpen={showColabPitch}
          onClose={() => setShowColabPitch(false)}
          from={{
            name: currentUser.name,
            handle: currentUser.handle,
            avatarUrl: currentUser.avatarUrl,
            authorityScore: currentUser.authorityScore,
            niche: currentUser.niche,
            colabInterests: currentUser.colabInterests,
          }}
          to={{
            name: creator.name,
            handle: creator.handle,
            avatarUrl: creator.avatarUrl,
            authorityScore: creator.authorityScore,
            niche: creator.niche,
            colabInterests: creator.colabInterests,
          }}
        />
      )}
    </section>
  );
}
