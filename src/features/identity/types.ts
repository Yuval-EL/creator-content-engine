export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  niche: string;
  bio: string;
  authorityScore: number;
  badges: Badge[];
  techStack: TechItem[];
  streakData: StreakDay[];
  vouches: Vouch[];
}

export interface Badge {
  id: string;
  label: string;
  proof: string;
  category: string;
  glow?: boolean;
}

export interface TechItem {
  name: string;
  category: "software" | "hardware" | "ai";
}

export interface StreakDay {
  date: string;
  intensity: number; // 0-4
}

export interface Vouch {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorScore: number;
  testimonial: string;
}
