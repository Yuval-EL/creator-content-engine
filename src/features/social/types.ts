import type { CreatorProfile } from "@/features/identity/types";
import type { Playbook } from "@/features/playbooks/types";

export interface CredBreakdown {
  weights: { vouches: number; remixes: number; consistency: number };
  scores: { vouches: number; remixes: number; consistency: number };
  totalScore: number;
}

export interface NicheExpertise {
  id: string;
  label: string;
  score: number;
}

export interface DirectorNote {
  id: string;
  author: {
    name: string;
    handle: string;
    authorityScore: number;
  };
  timestamp?: string;
  assetRef?: string;
  content: string;
  createdAt: string;
  type: "feedback" | "suggestion" | "praise";
}

export interface CredTransaction {
  id: string;
  type: "vouch" | "remix" | "trophy" | "milestone";
  points: number;
  description: string;
  fromUser?: {
    name: string;
    handle: string;
    authorityScore: number;
  };
  createdAt: string;
  relatedPlaybook?: string;
}

export interface VouchGateState {
  canVouch: boolean;
  currentScore: number;
  requiredScore: number;
  hasVouched: boolean;
}

export interface ColabProposal {
  id: string;
  from: { name: string; handle: string; authorityScore: number; avatarUrl: string };
  to: { name: string; handle: string; authorityScore: number; avatarUrl: string };
  vision: string;
  skillSynergies: string[];
  status: "pending" | "active" | "completed";
  createdAt: string;
}

export interface FeedPost {
  id: string;
  type: "video" | "text";
  author: { name: string; handle: string; authorityScore: number; avatarUrl: string };
  content: string;
  video?: {
    thumbnailGradient: string;
    duration: string;
    title: string;
  };
  relatedPlaybook?: string;
  tags?: string[];
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface FeedEvent {
  id: string;
  type: "vouch" | "remix" | "publish" | "trophy" | "milestone" | "colab";
  actor: { name: string; handle: string; authorityScore: number; avatarUrl: string };
  target?: { name: string; handle: string; authorityScore: number; avatarUrl: string };
  content: string;
  detail?: string;
  relatedPlaybook?: string;
  metrics?: { label: string; value: string };
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface HubUser {
  profile: CreatorProfile;
  cred: CredBreakdown;
  expertise: NicheExpertise[];
  playbooks: Playbook[];
  transactions: CredTransaction[];
  directorNotes: DirectorNote[];
}
