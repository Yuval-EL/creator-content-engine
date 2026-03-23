import type {
  CredBreakdown,
  NicheExpertise,
  DirectorNote,
  CredTransaction,
  VouchGateState,
} from "../types";

export const mockCredBreakdown: CredBreakdown = {
  weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 },
  scores: { vouches: 89, remixes: 82, consistency: 90 },
  // 89*0.6 + 82*0.3 + 90*0.1 = 53.4 + 24.6 + 9.0 = 87
  totalScore: 87,
};

export const mockExpertise: NicheExpertise[] = [
  { id: "e1", label: "Storytelling", score: 92 },
  { id: "e2", label: "Editing", score: 85 },
  { id: "e3", label: "AI Integration", score: 81 },
  { id: "e4", label: "Color Science", score: 74 },
  { id: "e5", label: "Sound Design", score: 68 },
];

export const mockDirectorNotes: DirectorNote[] = [
  {
    id: "dn1",
    author: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 },
    timestamp: "6:40",
    content:
      "The way you handle the skin tone qualifier here is brilliant. I've been protecting skin tones wrong for years — the secondary qualifier trick alone is worth the entire playbook.",
    createdAt: "2026-03-21",
    type: "praise",
  },
  {
    id: "dn2",
    author: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 },
    assetRef: "Scene Analysis Prompt",
    content:
      "This prompt is exceptional. I tweaked it for wildlife docs and the grade suggestions were 90% usable out of the box. Consider adding a 'genre' parameter for even tighter results.",
    createdAt: "2026-03-19",
    type: "feedback",
  },
  {
    id: "dn3",
    author: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 },
    timestamp: "15:30",
    content:
      "The AI-assisted scene matching section needs more detail on prompt chaining for multi-scene projects. When I tried it on a 40-scene doc, the consistency dropped after scene 15.",
    createdAt: "2026-03-18",
    type: "suggestion",
  },
  {
    id: "dn4",
    author: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 },
    assetRef: "Client Revision Translator",
    content:
      "Used this on a real client call. They said 'make it pop' and the prompt returned three ranked interpretations — nailed it on the first try. Studio adopted it the same week.",
    createdAt: "2026-03-16",
    type: "praise",
  },
];

export const mockCredTransactions: CredTransaction[] = [
  {
    id: "ct1",
    type: "vouch",
    points: 55,
    description: "Ava Rodriguez vouched for your Color Science expertise",
    fromUser: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 },
    createdAt: "2026-03-22",
  },
  {
    id: "ct2",
    type: "remix",
    points: 120,
    description: "Color Grading playbook remixed 50× this week",
    createdAt: "2026-03-21",
    relatedPlaybook: "Cinematic Color Grading for Documentary",
  },
  {
    id: "ct3",
    type: "trophy",
    points: 200,
    description: "Jordan Kale's remix won 'Best Edit' at Brand Film Awards",
    fromUser: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 },
    createdAt: "2026-03-20",
    relatedPlaybook: "Short-Form Retention Framework",
  },
  {
    id: "ct4",
    type: "milestone",
    points: 25,
    description: "30-day creation streak achieved",
    createdAt: "2026-03-19",
  },
  {
    id: "ct5",
    type: "vouch",
    points: 51,
    description: "Suki Tanaka vouched for your AI Integration methods",
    fromUser: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 },
    createdAt: "2026-03-18",
  },
  {
    id: "ct6",
    type: "remix",
    points: 80,
    description: "Sound Design playbook remixed 30× this month",
    createdAt: "2026-03-15",
    relatedPlaybook: "Sound Design for Tension & Atmosphere",
  },
  {
    id: "ct7",
    type: "vouch",
    points: 14,
    description: "Fresh Cuts vouched for your Editing style",
    fromUser: { name: "Fresh Cuts", handle: "@freshcuts", authorityScore: 23 },
    createdAt: "2026-03-14",
  },
  {
    id: "ct8",
    type: "trophy",
    points: 150,
    description: "Suki's storyboard remix used in Netflix pilot pre-vis",
    fromUser: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 },
    createdAt: "2026-03-12",
    relatedPlaybook: "AI-Driven Storyboard Pipeline",
  },
];

/** Simulated viewer — below vouch threshold to demo gating */
export const mockVouchGate: VouchGateState = {
  canVouch: false,
  currentScore: 35,
  requiredScore: 50,
  hasVouched: false,
};
