import type { CreatorProfile } from "../types";

function generateStreakData(): CreatorProfile["streakData"] {
  const days: CreatorProfile["streakData"] = [];
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let intensity: number;
    if (Math.random() < 0.1) {
      intensity = 0;
    } else if (isWeekend) {
      intensity = Math.random() < 0.4 ? 0 : Math.ceil(Math.random() * 2);
    } else {
      intensity = Math.ceil(Math.random() * 4);
    }

    days.push({
      date: date.toISOString().split("T")[0],
      intensity,
    });
  }

  return days;
}

export const mockCreator: CreatorProfile = {
  id: "cr_01",
  name: "Marcus Chen",
  handle: "@marcuscuts",
  niche: "Cinematic Editor & Visual Storyteller",
  bio: "Turning raw footage into feeling. 8 years cutting docs, brand films, and music videos. My playbooks have been remixed 2,400+ times.",
  authorityScore: 87,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=MarcusChen&backgroundColor=b6e3f4",
  coverGradient: "linear-gradient(135deg, #0c0c1d 0%, #312e81 50%, #1e1b4b 100%)",
  followers: 8200,
  following: 189,
  openToColab: true,
  colabInterests: ["Color science for narrative projects", "Sound-driven editing experiments", "AI grading pipelines"],
  badges: [
    {
      id: "b1",
      label: "Retention Master",
      proof: "Top 3% audience retention across 140+ published edits",
      category: "Performance",
      glow: true,
    },
    {
      id: "b2",
      label: "Remix Magnet",
      proof: "Playbooks remixed 2,400+ times by 890 unique creators",
      category: "Influence",
      glow: true,
    },
    {
      id: "b3",
      label: "Workflow Architect",
      proof: "12 published playbooks with avg. 4.8★ utility rating",
      category: "Craft",
    },
    {
      id: "b4",
      label: "Color Science",
      proof: "Certified DaVinci Resolve colorist — 600+ graded projects",
      category: "Specialization",
    },
    {
      id: "b5",
      label: "Sound Design",
      proof: "Audio-first editing approach adopted by 340+ editors",
      category: "Specialization",
    },
  ],
  techStack: [
    { name: "Premiere Pro", category: "software" },
    { name: "DaVinci Resolve", category: "software" },
    { name: "After Effects", category: "software" },
    { name: "Figma", category: "software" },
    { name: "Claude", category: "ai" },
    { name: "Runway ML", category: "ai" },
    { name: "RED V-Raptor", category: "hardware" },
    { name: "Blackmagic 6K", category: "hardware" },
    { name: "Rode NTG5", category: "hardware" },
  ],
  streakData: generateStreakData(),
  vouches: [
    {
      id: "v1",
      creatorName: "Ava Rodriguez",
      creatorHandle: "@avaframes",
      creatorScore: 92,
      testimonial:
        "Marcus's color grading playbook saved our studio 40 hours on a Netflix doc. His methods are surgical.",
    },
    {
      id: "v2",
      creatorName: "Jordan Kale",
      creatorHandle: "@jkale.edit",
      creatorScore: 78,
      testimonial:
        "Remixed his pacing framework for short-form. My retention went from 42% to 71% in two weeks.",
    },
    {
      id: "v3",
      creatorName: "Suki Tanaka",
      creatorHandle: "@sukicuts",
      creatorScore: 85,
      testimonial:
        "The only creator whose playbooks I trust without previewing. Consistently battle-tested workflows.",
    },
  ],
};
