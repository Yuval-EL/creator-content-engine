export interface Playbook {
  id: string;
  title: string;
  description: string;
  creator: PlaybookCreator;
  category: string;
  tags: string[];
  thumbnailGradient: string;
  duration: string;
  version: string;
  remixCount: number;
  assets: Asset[];
  chapters: Chapter[];
  versions: VersionEntry[];
  publishedAt: string;
  verifiedWins?: number;
}

export interface PlaybookCreator {
  name: string;
  handle: string;
  authorityScore: number;
}

export interface Asset {
  id: string;
  type: "prompt" | "preset" | "template" | "lut" | "script";
  label: string;
  description: string;
  content?: string;
  fileName?: string;
}

export interface Chapter {
  id: string;
  title: string;
  timestamp: string;
  timestampSeconds: number;
}

export interface VersionEntry {
  version: string;
  date: string;
  summary: string;
  isCurrent: boolean;
}
