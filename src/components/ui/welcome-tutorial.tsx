"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Home,
  Compass,
  Trophy,
  TrendingUp,
  User,
  Heart,
  GitFork,
  Package,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Shield,
  Star,
  Zap,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Crown,
  Target,
  CheckCircle2,
  FileText,
  Wrench,
  Eye,
  Clock,
  Handshake,
  Play,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════ */

const STORAGE_KEY = "hub_tutorial_v4";

interface Step {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  {
    id: "welcome",
    badge: "Welcome",
    title: "Welcome to The Hub",
    subtitle: "The creator reputation layer — where creative know-how becomes verified currency and collaboration is the default.",
  },
  {
    id: "feed",
    badge: "Home",
    title: "Your Feed",
    subtitle: "The Feed is where creators share their work — video breakdowns, behind-the-scenes insights, and text posts about what they're building. The Updates tab tracks community activity like vouches, remixes, and new colabs.",
  },
  {
    id: "colabs",
    badge: "Core Feature",
    title: "Colabs",
    subtitle: "Colab is how creators find their creative other half. Pitch a collaboration by sending a structured DM — share your vision, see skill synergies, and start building together. Active colabs appear in the feed so the whole community can follow the journey.",
  },
  {
    id: "playbooks",
    badge: "Core Feature",
    title: "Playbooks",
    subtitle: "Your best strategies, packaged. A Playbook is a step-by-step breakdown of how you actually do what you do — complete with chapters, toolkits, and real results attached.",
  },
  {
    id: "remixes",
    badge: "Core Feature",
    title: "Remixes",
    subtitle: "See a Playbook that resonates? Remix it. Fork it into your own version, adapt it for your niche, and track your own results. The original creator gets credit — and cred — every time.",
  },
  {
    id: "vouches",
    badge: "Core Feature",
    title: "Vouches",
    subtitle: "A Vouch is a public endorsement from one creator to another. It says \"I've seen their work — it's legit.\" Vouches are weighted by the giver's Authority Score, so they can't be gamed.",
  },
  {
    id: "identity",
    badge: "Your Profile",
    title: "Authority & Identity",
    subtitle: "Your Authority Score, badges, creation streak, and tech stack paint a full picture of who you are as a creator. Every metric is earned, never bought.",
  },
  {
    id: "cred",
    badge: "Reputation",
    title: "The Cred System",
    subtitle: "Your Authority Score is built from three signals: Vouches from peers, Remixes of your Playbooks, and your Consistency over time. A transparent engine — no black boxes.",
  },
  {
    id: "flow",
    badge: "In Action",
    title: "A Day on The Hub",
    subtitle: "Here's what a typical journey looks like — from discovery to collaboration, in five moments.",
  },
  {
    id: "navigate",
    badge: "Discover",
    title: "Find Your Way",
    subtitle: "Six ways to explore the platform — each tuned to a different intent.",
  },
  {
    id: "start",
    badge: "Ready",
    title: "You're All Set",
    subtitle: "Your reputation starts now. Every playbook, every remix, every vouch, every colab counts.",
  },
];

/* ═══════════════════════════════════════════════════
   REUSABLE PIECES
   ═══════════════════════════════════════════════════ */

function GlowOrb({ color, size, x, y, delay = 0 }: {
  color: string; size: number; x: string; y: string; delay?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{ width: size, height: size, left: x, top: y, background: color }}
      animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.15, 1] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function FeatureChip({ icon: Icon, label, accent }: {
  icon: typeof Heart; label: string; accent: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-r-full border border-border bg-background-card px-4 py-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Icon size={14} className={accent} />
      <span className="text-xs font-medium text-foreground">{label}</span>
    </motion.div>
  );
}

function MockCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={`rounded-r2 border border-border bg-background-card p-4 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 1 — WELCOME
   ═══════════════════════════════════════════════════ */

function WelcomeVisual() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <GlowOrb color="rgba(108, 99, 255, 0.3)" size={300} x="20%" y="20%" />
      <GlowOrb color="rgba(52, 211, 153, 0.2)" size={250} x="60%" y="50%" delay={2} />
      <GlowOrb color="rgba(251, 191, 36, 0.15)" size={200} x="30%" y="60%" delay={4} />

      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          className="flex h-24 w-24 items-center justify-center rounded-2xl bg-accent shadow-lg"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Flame size={48} className="text-white" />
        </motion.div>

        {[
          { Icon: Package, angle: 0, color: "text-info", delay: 0.3 },
          { Icon: GitFork, angle: 51, color: "text-success", delay: 0.4 },
          { Icon: Handshake, angle: 103, color: "text-accent", delay: 0.45 },
          { Icon: Heart, angle: 154, color: "text-error", delay: 0.5 },
          { Icon: Trophy, angle: 206, color: "text-warning", delay: 0.6 },
          { Icon: Shield, angle: 257, color: "text-accent", delay: 0.7 },
          { Icon: Star, angle: 309, color: "text-foreground-sub", delay: 0.8 },
        ].map(({ Icon, angle, color, delay }) => {
          const r = 140;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.div
              key={angle}
              className={`absolute flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-card ${color}`}
              style={{ left: `calc(50% + ${Math.cos(rad) * r}px - 20px)`, top: `calc(50% + ${Math.sin(rad) * r}px - 20px)` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={18} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 2 — FEED
   ═══════════════════════════════════════════════════ */

function FeedVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden px-6">
      <GlowOrb color="rgba(96, 165, 250, 0.2)" size={250} x="40%" y="15%" />
      <GlowOrb color="rgba(108, 99, 255, 0.15)" size={200} x="60%" y="55%" delay={2} />

      {/* Feed tab preview */}
      <MockCard delay={0.1}>
        <div className="mb-3 flex items-center gap-2">
          <Home size={14} className="text-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Feed &amp; Updates</span>
        </div>
        <div className="flex gap-2 mb-3">
          <span className="rounded-r-full bg-accent px-3 py-1 text-[10px] font-semibold text-white">Feed</span>
          <span className="rounded-r-full border border-border px-3 py-1 text-[10px] font-medium text-foreground-ghost">Updates</span>
        </div>
        <p className="text-[10px] leading-relaxed text-foreground-ghost">
          <strong className="text-foreground-sub">Feed</strong> — Videos and posts where creators share their playbook breakdowns, techniques, and insights.
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-foreground-ghost">
          <strong className="text-foreground-sub">Updates</strong> — Activity stream of vouches, remixes, wins, milestones, and new colabs.
        </p>
      </MockCard>

      {/* Video post mock */}
      <MockCard delay={0.3}>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-hover" />
          <div>
            <p className="text-[11px] font-semibold text-foreground">Lena Voss</p>
            <p className="text-[9px] text-foreground-ghost">1h ago</p>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-foreground-sub mb-2">
          Here&apos;s the exact moment the client went from &apos;nice&apos; to &apos;the one.&apos; Full breakdown from my Brand Film playbook...
        </p>
        <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-r border border-border" style={{ background: "linear-gradient(135deg, #1a1408 0%, #713f12 100%)" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play size={14} className="ml-0.5 text-white" fill="white" />
          </div>
          <span className="absolute bottom-1.5 right-2 rounded-r-sm bg-black/70 px-1.5 py-0.5 text-[8px] font-medium text-white">3:42</span>
        </div>
        {/* Interaction bar */}
        <div className="mt-2.5 flex items-center gap-3">
          {[
            { icon: Heart, label: "467", color: "text-foreground-ghost" },
            { icon: MessageCircle, label: "83", color: "text-foreground-ghost" },
            { icon: Handshake, label: "", color: "text-foreground-ghost" },
            { icon: Share2, label: "124", color: "text-foreground-ghost" },
          ].map((a, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <a.icon size={11} className={a.color} />
              {a.label && <span className="text-[9px] text-foreground-ghost">{a.label}</span>}
            </motion.div>
          ))}
        </div>
      </MockCard>

      {/* Text post mock */}
      <MockCard delay={0.5}>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-info to-info/60" />
          <div>
            <p className="text-[11px] font-semibold text-foreground">Marcus Chen</p>
            <p className="text-[9px] text-foreground-ghost">3h ago</p>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-foreground-sub">
          Warm grade = 23% longer watch time. Color isn&apos;t decoration — it&apos;s retention infrastructure...
        </p>
      </MockCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 3 — COLABS
   ═══════════════════════════════════════════════════ */

function ColabsVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <GlowOrb color="rgba(108, 99, 255, 0.3)" size={280} x="45%" y="20%" />
      <GlowOrb color="rgba(52, 211, 153, 0.2)" size={200} x="25%" y="60%" delay={2} />

      {/* Colab pitch example */}
      <MockCard delay={0.1}>
        <div className="mb-3 flex items-center gap-2">
          <Handshake size={14} className="text-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">Colab Pitch</span>
        </div>
        {/* Two creators */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent-hover" />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background-card bg-accent text-[7px] font-bold text-white">94</div>
            </div>
            <span className="text-[9px] font-medium text-foreground">Lena</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap size={18} className="text-accent" />
          </motion.div>
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-error/60 to-error/30" />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background-card bg-accent text-[7px] font-bold text-white">92</div>
            </div>
            <span className="text-[9px] font-medium text-foreground">Ava</span>
          </div>
        </div>
        <p className="text-[10px] italic leading-relaxed text-foreground-sub">
          &ldquo;Let&apos;s build &apos;The Sensory Brand Film&apos; — your tension layering meets my visual architecture.&rdquo;
        </p>
      </MockCard>

      {/* Synergies */}
      <MockCard delay={0.4}>
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles size={12} className="text-warning" />
          <span className="text-[10px] font-semibold text-foreground-sub">Skill Synergies</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Brand Strategy + Sound Design", "Cinematography + Audio", "Client Mgmt + Studio"].map((s, i) => (
            <motion.span
              key={s}
              className="flex items-center gap-1 rounded-r-full border border-accent/20 bg-accent-subtle px-2.5 py-1 text-[9px] font-medium text-accent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Zap size={8} />
              {s}
            </motion.span>
          ))}
        </div>
      </MockCard>

      {/* Where colabs live */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { icon: Home, label: "Appears in the feed", color: "text-accent" },
          { icon: User, label: "Shows on both profiles", color: "text-info" },
          { icon: Handshake, label: "Dedicated Colabs page", color: "text-success" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-1.5 rounded-r-full border border-border bg-background-card px-3 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
          >
            <item.icon size={11} className={item.color} />
            <span className="text-[10px] font-medium text-foreground-sub">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 4 — PLAYBOOKS
   ═══════════════════════════════════════════════════ */

function PlaybooksVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden px-6">
      <GlowOrb color="rgba(96, 165, 250, 0.2)" size={250} x="50%" y="15%" />
      <GlowOrb color="rgba(52, 211, 153, 0.15)" size={180} x="20%" y="60%" delay={2} />

      {/* Playbook anatomy */}
      <MockCard delay={0.1}>
        <div className="mb-3 flex items-center gap-2">
          <Package size={14} className="text-info" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-info">Playbook Anatomy</span>
        </div>
        <h4 className="text-sm font-bold text-foreground">YouTube Shorts Growth Playbook</h4>
        <p className="mt-1 text-[10px] text-foreground-ghost">by Lena Voss · 2.1k remixes · 12 verified wins</p>
        <div className="mt-3 flex flex-col gap-2">
          {[
            { icon: FileText, label: "Chapters", desc: "Timestamped step-by-step walkthrough" },
            { icon: Wrench, label: "Toolkit", desc: "Presets, templates, prompts & scripts" },
            { icon: Clock, label: "Evolution Timeline", desc: "Version history with change notes" },
            { icon: Trophy, label: "Verified Wins", desc: "Proof that the strategy actually works" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2.5 rounded-r border border-border bg-background px-3 py-2"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <item.icon size={13} className="shrink-0 text-accent" />
              <div>
                <span className="text-[11px] font-semibold text-foreground">{item.label}</span>
                <span className="ml-1.5 text-[10px] text-foreground-ghost">— {item.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </MockCard>

      {/* Director's Notes */}
      <MockCard delay={0.7}>
        <div className="flex items-center gap-3 p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-info/10">
            <MessageCircle size={14} className="text-info" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Director&apos;s Notes</p>
            <p className="text-[10px] text-foreground-ghost">
              Community feedback pinned to specific moments — praise, suggestions, and insights from peers.
            </p>
          </div>
        </div>
      </MockCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 3 — REMIXES
   ═══════════════════════════════════════════════════ */

function RemixesVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <GlowOrb color="rgba(52, 211, 153, 0.25)" size={260} x="40%" y="20%" />

      {/* Original → Remix flow */}
      <MockCard delay={0.1}>
        <div className="mb-2 flex items-center gap-2">
          <Package size={13} className="text-foreground-sub" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-ghost">Original</span>
        </div>
        <p className="text-sm font-bold text-foreground">Hook Writing Framework</p>
        <p className="text-[10px] text-foreground-ghost">by Marcus Cole</p>
      </MockCard>

      {/* Arrow */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <GitFork size={20} className="text-success" />
        <span className="text-[10px] font-semibold text-success">Remix it</span>
      </motion.div>

      <MockCard delay={0.5}>
        <div className="mb-2 flex items-center gap-2">
          <GitFork size={13} className="text-success" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-success">Your remix</span>
        </div>
        <p className="text-sm font-bold text-foreground">Hook Writing for B2B SaaS</p>
        <p className="text-[10px] text-foreground-ghost">by You · adapted for your niche</p>
      </MockCard>

      {/* What happens */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { icon: User, label: "Original creator gets cred", color: "text-accent" },
          { icon: Trophy, label: "Your wins count too", color: "text-warning" },
          { icon: Eye, label: "Full attribution chain", color: "text-info" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-1.5 rounded-r-full border border-border bg-background-card px-3 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <item.icon size={11} className={item.color} />
            <span className="text-[10px] font-medium text-foreground-sub">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 4 — VOUCHES
   ═══════════════════════════════════════════════════ */

function VouchesVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <GlowOrb color="rgba(248, 113, 113, 0.2)" size={240} x="50%" y="25%" />
      <GlowOrb color="rgba(108, 99, 255, 0.15)" size={180} x="25%" y="55%" delay={2} />

      {/* Vouch example */}
      <MockCard delay={0.1}>
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent-hover" />
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background-card bg-accent text-[8px] font-bold text-white">
              92
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">Lena Voss</span>
              <Heart size={11} className="text-accent" />
              <span className="text-xs font-semibold text-foreground">Rikki Chen</span>
            </div>
            <p className="mt-1 text-[11px] italic leading-relaxed text-foreground-sub">
              &ldquo;Rikki&apos;s B-roll techniques completely changed how I approach short-form editing. Battle-tested and proven.&rdquo;
            </p>
          </div>
        </div>
      </MockCard>

      {/* Weight explanation */}
      <MockCard delay={0.4}>
        <div className="flex items-center gap-3 p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-subtle">
            <Shield size={14} className="text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Weight Matters</p>
            <p className="text-[10px] text-foreground-ghost">
              A vouch from a high-Authority creator carries more weight. Score 92 vouch &gt; Score 15 vouch.
            </p>
          </div>
        </div>
      </MockCard>

      {/* Vouch Gate */}
      <MockCard delay={0.65}>
        <div className="flex items-center gap-3 p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
            <Shield size={14} className="text-warning" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Vouch Gate</p>
            <p className="text-[10px] text-foreground-ghost">
              You need a minimum Authority Score to vouch. This keeps endorsements rare and meaningful — no spam, no fake hype.
            </p>
          </div>
        </div>
      </MockCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 5 — AUTHORITY & IDENTITY
   ═══════════════════════════════════════════════════ */

function IdentityVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <GlowOrb color="rgba(108, 99, 255, 0.25)" size={250} x="50%" y="20%" />

      {/* Profile card */}
      <MockCard delay={0.1}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-accent to-accent-hover" />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background-card bg-accent text-[9px] font-bold text-white">
              92
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Lena Voss</p>
            <p className="text-xs text-foreground-ghost">@lenavoss</p>
            <div className="mt-1.5 flex gap-1.5">
              {["Top 1% Creator", "10k Remixes", "Streak: 90d"].map((badge) => (
                <span key={badge} className="rounded-r-full bg-accent-subtle px-2 py-0.5 text-[8px] font-semibold text-accent">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MockCard>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Shield, label: "Authority Score", desc: "One number for your reputation — earned through real contribution", color: "text-accent" },
          { icon: Star, label: "Badges", desc: "Verified achievements with proof attached — no self-awarded titles", color: "text-warning" },
          { icon: Zap, label: "Creation Streak", desc: "13 weeks of daily activity visualized as a heatmap", color: "text-success" },
          { icon: Wrench, label: "Tech Stack", desc: "Your software, hardware & AI tools — so others know your setup", color: "text-info" },
        ].map((f, i) => (
          <MockCard key={f.label} delay={0.3 + i * 0.1}>
            <div className="flex flex-col gap-1.5 p-1">
              <f.icon size={16} className={f.color} />
              <span className="text-[11px] font-semibold text-foreground">{f.label}</span>
              <span className="text-[9px] leading-snug text-foreground-ghost">{f.desc}</span>
            </div>
          </MockCard>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 6 — CRED SYSTEM
   ═══════════════════════════════════════════════════ */

function CredVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden px-6">
      <GlowOrb color="rgba(108, 99, 255, 0.3)" size={280} x="40%" y="25%" />

      {/* Cred breakdown */}
      <MockCard delay={0.1}>
        <div className="flex items-center gap-6 p-2">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <svg viewBox="0 0 80 80" className="h-20 w-20">
              <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="6" />
              <motion.circle
                cx="40" cy="40" r="34" fill="none" stroke="var(--ac)" strokeWidth="6"
                strokeDasharray="213.6" strokeLinecap="round"
                initial={{ strokeDashoffset: 213.6 }}
                animate={{ strokeDashoffset: 213.6 * 0.08 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="absolute text-lg font-bold text-foreground">92</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: Heart, label: "Vouches", pct: 40, color: "bg-accent", text: "text-accent" },
              { icon: GitFork, label: "Remixes", pct: 35, color: "bg-success", text: "text-success" },
              { icon: Zap, label: "Consistency", pct: 25, color: "bg-warning", text: "text-warning" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon size={11} className={s.text} />
                <span className="w-16 text-[10px] text-foreground-ghost">{s.label}</span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-background-hover">
                  <motion.div
                    className={`h-full rounded-full ${s.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-foreground">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </MockCard>

      {/* Cred Ledger */}
      <MockCard delay={0.6}>
        <div className="mb-2 flex items-center gap-2">
          <FileText size={13} className="text-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-ghost">Cred Ledger</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { type: "vouch", pts: "+12", desc: "Vouched by Lena Voss (92)", color: "text-accent" },
            { type: "remix", pts: "+8", desc: "Your playbook remixed 5 times", color: "text-success" },
            { type: "trophy", pts: "+25", desc: "Hit 1,000 total remixes", color: "text-warning" },
          ].map((tx, i) => (
            <motion.div
              key={tx.desc}
              className="flex items-center justify-between rounded-r border border-border bg-background px-3 py-1.5"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              <span className="text-[10px] text-foreground-sub">{tx.desc}</span>
              <span className={`text-[11px] font-bold ${tx.color}`}>{tx.pts}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-2 text-[9px] text-foreground-ghost">Every point is traceable. No mystery math.</p>
      </MockCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 7 — USER FLOW SIMULATION
   ═══════════════════════════════════════════════════ */

function FlowVisual() {
  const moments = [
    {
      icon: Compass,
      color: "text-info",
      bg: "bg-info/10",
      ring: "ring-info/30",
      title: "Discover",
      desc: "You scroll the feed and spot a video breakdown of a color grading technique",
    },
    {
      icon: GitFork,
      color: "text-success",
      bg: "bg-success/10",
      ring: "ring-success/30",
      title: "Remix",
      desc: "You remix the playbook, adapt the grade for your niche",
    },
    {
      icon: Handshake,
      color: "text-accent",
      bg: "bg-accent-subtle",
      ring: "ring-accent/30",
      title: "Colab",
      desc: "You pitch a colab to the original creator — your skills complement each other",
    },
    {
      icon: Trophy,
      color: "text-warning",
      bg: "bg-warning/10",
      ring: "ring-warning/30",
      title: "Win Together",
      desc: "Your colab playbook wins a festival — both of you earn verified wins",
    },
    {
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
      ring: "ring-success/30",
      title: "Level Up",
      desc: "Authority Score jumps. Vouches roll in. New colabs find you.",
    },
  ];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      <GlowOrb color="rgba(108, 99, 255, 0.2)" size={200} x="60%" y="20%" />
      <GlowOrb color="rgba(52, 211, 153, 0.15)" size={180} x="20%" y="60%" delay={2} />

      <div className="flex flex-col gap-0">
        {moments.map((m, i) => (
          <motion.div
            key={m.title}
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Timeline column */}
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 ${m.ring} ${m.bg}`}>
                <m.icon size={18} className={m.color} />
              </div>
              {i < moments.length - 1 && (
                <motion.div
                  className="w-px flex-1 bg-border"
                  style={{ minHeight: 24 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.3 }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-5 pt-1">
              <p className={`text-xs font-bold ${m.color}`}>{m.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-foreground-sub">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 8 — NAVIGATION
   ═══════════════════════════════════════════════════ */

function NavigateVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden px-6">
      <GlowOrb color="rgba(108, 99, 255, 0.2)" size={200} x="30%" y="40%" />

      {[
        {
          icon: Home, label: "Feed", desc: "Videos, posts, and creator insights. Updates tab for activity.",
          color: "text-accent", bg: "bg-accent-subtle",
        },
        {
          icon: Compass, label: "Explore", desc: "Browse every playbook on the platform, sorted by popularity.",
          color: "text-info", bg: "bg-info/10",
        },
        {
          icon: Handshake, label: "Colabs", desc: "Browse active collaborations, open pitches, and find your creative match.",
          color: "text-accent", bg: "bg-accent-subtle",
        },
        {
          icon: Crown, label: "Leaderboard", desc: "Top creators ranked by Authority Score.",
          color: "text-warning", bg: "bg-warning/10",
        },
        {
          icon: TrendingUp, label: "Trending", desc: "Hottest playbooks right now by wins and remix velocity.",
          color: "text-success", bg: "bg-success/10",
        },
        {
          icon: User, label: "Profile", desc: "Your playbooks, activity, cred breakdown, badges, and tech stack.",
          color: "text-foreground-sub", bg: "bg-background-hover",
        },
      ].map((nav, i) => (
        <MockCard key={nav.label} delay={0.1 + i * 0.08}>
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-r ${nav.bg}`}>
              <nav.icon size={16} className={nav.color} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-foreground">{nav.label}</p>
              <p className="text-[10px] leading-relaxed text-foreground-ghost">{nav.desc}</p>
            </div>
          </div>
        </MockCard>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 9 — START
   ═══════════════════════════════════════════════════ */

function StartVisual({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 overflow-hidden">
      <GlowOrb color="rgba(108, 99, 255, 0.3)" size={350} x="35%" y="25%" />
      <GlowOrb color="rgba(52, 211, 153, 0.2)" size={250} x="55%" y="55%" delay={2} />

      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-success/20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <CheckCircle2 size={40} className="text-success" />
      </motion.div>

      <div className="flex flex-col items-center gap-3 text-center">
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Package, label: "Publish playbooks" },
            { icon: GitFork, label: "Remix strategies" },
            { icon: Handshake, label: "Pitch colabs" },
            { icon: Heart, label: "Vouch for creators" },
            { icon: Trophy, label: "Earn verified wins" },
          ].map((item) => (
            <FeatureChip key={item.label} icon={item.icon} label={item.label} accent="text-accent" />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={onComplete}
          className="group flex items-center gap-2 rounded-r-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl"
        >
          Enter The Hub
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT — auto-shows once, then never again
   ═══════════════════════════════════════════════════ */

export function WelcomeTutorial({ mode = "page" }: { mode?: "page" | "auto" }) {
  const [visible, setVisible] = useState(mode === "page");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (mode !== "auto") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      setVisible(true);
    } catch {}
  }, [mode]);

  const dismiss = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setVisible(false);
  }, []);

  const step = STEPS[current];
  const isLast = current === STEPS.length - 1;
  const isFirst = current === 0;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setCurrent((c) => Math.max(0, Math.min(STEPS.length - 1, c + delta)));
    },
    [],
  );

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && !isLast) go(1);
      if (e.key === "ArrowLeft" && !isFirst) go(-1);
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, go, isFirst, isLast, dismiss]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const getVisual = (id: string) => {
    const map: Record<string, () => React.ReactNode> = {
      welcome: () => <WelcomeVisual />,
      feed: () => <FeedVisual />,
      colabs: () => <ColabsVisual />,
      playbooks: () => <PlaybooksVisual />,
      remixes: () => <RemixesVisual />,
      vouches: () => <VouchesVisual />,
      identity: () => <IdentityVisual />,
      cred: () => <CredVisual />,
      flow: () => <FlowVisual />,
      navigate: () => <NavigateVisual />,
      start: () => <StartVisual onComplete={dismiss} />,
    };
    return (map[id] ?? map.welcome)();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.3 }}
        >
          {/* ═══ TOP BAR ═══ */}
          <header className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-r-sm bg-accent">
                <Flame size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">The Hub</span>
            </div>
            <button
              onClick={dismiss}
              className="text-xs font-medium text-foreground-ghost transition-colors hover:text-foreground-sub"
            >
              Skip tutorial
            </button>
          </header>

          {/* ═══ PROGRESS BAR ═══ */}
          <div className="mx-auto flex w-full max-w-lg gap-1.5 px-6">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-background-hover"
                aria-label={`Go to step ${i + 1}: ${s.title}`}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  initial={false}
                  animate={{ width: i <= current ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            ))}
          </div>

          {/* ═══ CONTENT ═══ */}
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Left: Text panel */}
            <div className="flex w-full flex-col justify-center px-8 py-8 lg:w-[420px] lg:px-12 lg:py-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-r-full border border-border bg-background-card px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground-ghost">
                    <Target size={10} className="text-accent" />
                    {step.badge}
                  </span>
                  <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-sub">
                    {step.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="mt-8 flex items-center gap-3">
                {!isFirst && (
                  <button
                    onClick={() => go(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-sub transition-colors hover:bg-background-hover hover:text-foreground"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}
                {!isLast && (
                  <button
                    onClick={() => go(1)}
                    className="flex items-center gap-2 rounded-r-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Step count */}
              <p className="mt-6 text-[10px] font-medium text-foreground-ghost">
                {current + 1} / {STEPS.length}
              </p>
            </div>

            {/* Right: Visual panel */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {getVisual(step.id)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ═══ KEYBOARD HINT ═══ */}
          <footer className="flex items-center justify-center gap-4 px-6 py-3">
            <div className="flex items-center gap-1.5 text-[10px] text-foreground-ghost">
              <kbd className="rounded border border-border bg-background-card px-1.5 py-0.5 font-mono text-[9px]">&larr;</kbd>
              <kbd className="rounded border border-border bg-background-card px-1.5 py-0.5 font-mono text-[9px]">&rarr;</kbd>
              <span className="ml-1">to navigate</span>
              <span className="mx-1 text-foreground-ghost/40">|</span>
              <kbd className="rounded border border-border bg-background-card px-1.5 py-0.5 font-mono text-[9px]">esc</kbd>
              <span className="ml-1">to skip</span>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
