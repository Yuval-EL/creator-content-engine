import type { CreatorProfile, StreakDay } from "@/features/identity/types";
import type { Playbook } from "@/features/playbooks/types";
import type {
  CredBreakdown,
  NicheExpertise,
  DirectorNote,
  CredTransaction,
  ColabProposal,
  FeedEvent,
  FeedPost,
  HubUser,
} from "../types";

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generateStreak(seed: number): StreakDay[] {
  const rand = seededRandom(seed);
  const days: StreakDay[] = [];
  const base = new Date("2026-03-23");
  for (let i = 90; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const r = rand();
    const wknd = d.getDay() === 0 || d.getDay() === 6;
    let intensity: number;
    if (r < 0.1) intensity = 0;
    else if (wknd) intensity = r < 0.4 ? 0 : Math.ceil(r * 2);
    else intensity = Math.ceil(r * 4);
    days.push({ date: d.toISOString().split("T")[0], intensity });
  }
  return days;
}

function u(handle: string) {
  return handle.replace("@", "");
}

/* ═══════════════════════════════════════════════════
   PROFILES
   ═══════════════════════════════════════════════════ */

const lenaProfile: CreatorProfile = {
  id: "cr_06",
  name: "Lena Voss",
  handle: "@lenavoss",
  niche: "Brand Film Director & Creative Strategist",
  bio: "Ex-agency creative director turned independent filmmaker. My brand film playbooks have been behind 3 Super Bowl spots and 40+ festival selections. Every frame should sell a feeling.",
  authorityScore: 94,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=LenaVoss&backgroundColor=c0aede",
  coverGradient: "linear-gradient(135deg, #1a1040 0%, #6c63ff 50%, #ff6b6b 100%)",
  followers: 12400,
  following: 234,
  openToColab: true,
  colabInterests: ["Brand documentaries", "Sound-driven narratives", "AI-augmented pre-production"],
  badges: [
    { id: "lb1", label: "Top Voice", proof: "Top 1% Authority Score on the platform", category: "Status", glow: true },
    { id: "lb2", label: "Campaign Architect", proof: "30+ brand film playbooks with proven ROI", category: "Craft", glow: true },
    { id: "lb3", label: "Festival Winner", proof: "12 festival selections from remix creators", category: "Impact" },
    { id: "lb4", label: "Vouch Magnet", proof: "Most-vouched creator for 3 consecutive months", category: "Reputation" },
  ],
  techStack: [
    { name: "RED V-Raptor", category: "hardware" },
    { name: "ARRI ALEXA Mini", category: "hardware" },
    { name: "DaVinci Resolve", category: "software" },
    { name: "Premiere Pro", category: "software" },
    { name: "After Effects", category: "software" },
    { name: "Frame.io", category: "software" },
    { name: "Claude", category: "ai" },
    { name: "Midjourney", category: "ai" },
  ],
  streakData: generateStreak(601),
  vouches: [
    { id: "lv1", creatorName: "Marcus Chen", creatorHandle: "@marcuscuts", creatorScore: 87, testimonial: "Lena's Brand Film Formula changed how I think about commercial narrative. Essential reading." },
    { id: "lv2", creatorName: "Ava Rodriguez", creatorHandle: "@avaframes", creatorScore: 92, testimonial: "Her client communication playbook is the missing MBA for creative directors." },
  ],
};

const avaProfile: CreatorProfile = {
  id: "cr_02",
  name: "Ava Rodriguez",
  handle: "@avaframes",
  niche: "Documentary Filmmaker & Sound Designer",
  bio: "Two-time Emmy-nominated sound designer. 15 years crafting immersive audio for docs and narrative film. My sound playbooks are trusted by studios on three continents.",
  authorityScore: 92,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=AvaRodriguez&backgroundColor=ffd5dc",
  coverGradient: "linear-gradient(135deg, #1f1c2c 0%, #302b63 50%, #24243e 100%)",
  followers: 9800,
  following: 312,
  openToColab: true,
  colabInterests: ["Documentary scoring", "Immersive audio for brand films", "Sound design mentorship"],
  badges: [
    { id: "ab1", label: "Emmy Nominated", proof: "2× Emmy nominations for Outstanding Sound Mixing", category: "Industry", glow: true },
    { id: "ab2", label: "Sound Authority", proof: "Top 2% in Sound Design niche expertise", category: "Specialization", glow: true },
    { id: "ab3", label: "Mentor", proof: "50+ creators mentored through direct notes", category: "Community" },
    { id: "ab4", label: "Studio Trusted", proof: "Playbooks adopted by 6 post-production studios", category: "Impact" },
  ],
  techStack: [
    { name: "Pro Tools", category: "software" },
    { name: "Izotope RX", category: "software" },
    { name: "DaVinci Resolve", category: "software" },
    { name: "Descript", category: "software" },
    { name: "Sound Devices MixPre", category: "hardware" },
    { name: "Rode NTG5", category: "hardware" },
    { name: "Claude", category: "ai" },
  ],
  streakData: generateStreak(201),
  vouches: [
    { id: "av1", creatorName: "Suki Tanaka", creatorHandle: "@sukicuts", creatorScore: 85, testimonial: "The only sound designer whose foley suggestions I trust without previewing." },
    { id: "av2", creatorName: "Lena Voss", creatorHandle: "@lenavoss", creatorScore: 94, testimonial: "Ava elevated the sound on our Super Bowl spot. Her tension playbook is gold." },
  ],
};

const marcusProfile: CreatorProfile = {
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
    { id: "mb1", label: "Retention Master", proof: "Top 3% audience retention across 140+ published edits", category: "Performance", glow: true },
    { id: "mb2", label: "Remix Magnet", proof: "Playbooks remixed 2,400+ times by 890 unique creators", category: "Influence", glow: true },
    { id: "mb3", label: "Workflow Architect", proof: "12 published playbooks with avg. 4.8★ utility rating", category: "Craft" },
    { id: "mb4", label: "Color Science", proof: "Certified DaVinci Resolve colorist — 600+ graded projects", category: "Specialization" },
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
  ],
  streakData: generateStreak(101),
  vouches: [
    { id: "mv1", creatorName: "Ava Rodriguez", creatorHandle: "@avaframes", creatorScore: 92, testimonial: "Marcus's color grading playbook saved our studio 40 hours on a Netflix doc." },
    { id: "mv2", creatorName: "Jordan Kale", creatorHandle: "@jkale.edit", creatorScore: 78, testimonial: "Remixed his pacing framework for short-form. My retention went from 42% to 71%." },
    { id: "mv3", creatorName: "Suki Tanaka", creatorHandle: "@sukicuts", creatorScore: 85, testimonial: "The only creator whose playbooks I trust without previewing." },
  ],
};

const sukiProfile: CreatorProfile = {
  id: "cr_04",
  name: "Suki Tanaka",
  handle: "@sukicuts",
  niche: "AI-Augmented Visual Storyteller",
  bio: "Bridging traditional storyboarding with AI generation. My workflows cut pre-production time by 60% without sacrificing creative intent. Former Pixar pre-vis artist.",
  authorityScore: 85,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=SukiTanaka&backgroundColor=d1f4d9",
  coverGradient: "linear-gradient(135deg, #0a1a1f 0%, #155e75 50%, #0f766e 100%)",
  followers: 6500,
  following: 278,
  openToColab: true,
  colabInterests: ["AI-driven visual development", "Storyboard-to-VFX pipelines", "Cross-discipline workflow design"],
  badges: [
    { id: "sb1", label: "AI Pioneer", proof: "First creator to publish a full AI storyboard pipeline", category: "Innovation", glow: true },
    { id: "sb2", label: "Pixar Alumni", proof: "3 years on Pixar's pre-visualization team", category: "Industry", glow: true },
    { id: "sb3", label: "Pipeline Builder", proof: "5 end-to-end workflow playbooks with 95% completion rate", category: "Craft" },
  ],
  techStack: [
    { name: "Runway ML", category: "ai" },
    { name: "Claude", category: "ai" },
    { name: "Midjourney", category: "ai" },
    { name: "ComfyUI", category: "ai" },
    { name: "Photoshop", category: "software" },
    { name: "Figma", category: "software" },
    { name: "Blender", category: "software" },
  ],
  streakData: generateStreak(401),
  vouches: [
    { id: "sv1", creatorName: "Dante Morales", creatorHandle: "@dantevfx", creatorScore: 71, testimonial: "Her storyboard pipeline cut our pre-vis time in half. Game-changer." },
    { id: "sv2", creatorName: "Marcus Chen", creatorHandle: "@marcuscuts", creatorScore: 87, testimonial: "Suki's AI prompts are the most production-ready I've seen anywhere." },
  ],
};

const jordanProfile: CreatorProfile = {
  id: "cr_03",
  name: "Jordan Kale",
  handle: "@jkale.edit",
  niche: "Short-Form Editor & Retention Scientist",
  bio: "I treat every second of content like real estate. Data-driven editing approach that turned agency clients from 40% avg retention to 70%+. The numbers don't lie.",
  authorityScore: 78,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanKale&backgroundColor=ffeaa7",
  coverGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  followers: 5100,
  following: 445,
  openToColab: true,
  colabInterests: ["Data-driven content strategy", "Short-form for brand clients", "Retention experiments"],
  badges: [
    { id: "jb1", label: "Retention Specialist", proof: "Avg. 68% retention across 200+ client videos", category: "Performance", glow: true },
    { id: "jb2", label: "Data-Driven", proof: "Every playbook includes A/B tested metrics", category: "Methodology" },
    { id: "jb3", label: "Agency Proven", proof: "Methods adopted by 4 social-first agencies", category: "Impact" },
  ],
  techStack: [
    { name: "Premiere Pro", category: "software" },
    { name: "CapCut", category: "software" },
    { name: "After Effects", category: "software" },
    { name: "Claude", category: "ai" },
    { name: "Opus Clip", category: "ai" },
    { name: "Descript", category: "software" },
  ],
  streakData: generateStreak(301),
  vouches: [
    { id: "jv1", creatorName: "Marcus Chen", creatorHandle: "@marcuscuts", creatorScore: 87, testimonial: "Jordan turned retention from an art into a science. His beat-map template is genius." },
    { id: "jv2", creatorName: "Lena Voss", creatorHandle: "@lenavoss", creatorScore: 94, testimonial: "Our agency hired Jordan's methods before we hired Jordan. That says everything." },
  ],
};

const danteProfile: CreatorProfile = {
  id: "cr_05",
  name: "Dante Morales",
  handle: "@dantevfx",
  niche: "VFX Artist & Motion Designer",
  bio: "From music videos to movie trailers. I specialize in particle systems, procedural animation, and the kind of motion graphics that make people rewind. 5 years at a top-10 agency.",
  authorityScore: 71,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=DanteMorales&backgroundColor=ffcdd2",
  coverGradient: "linear-gradient(135deg, #1a0005 0%, #5b1a1a 50%, #4a1942 100%)",
  followers: 3800,
  following: 520,
  openToColab: true,
  colabInterests: ["VFX for brand content", "AI-generated particle systems", "Music video collaborations"],
  badges: [
    { id: "db1", label: "Visual Alchemist", proof: "Signature particle style recognized across 3M+ views", category: "Craft", glow: true },
    { id: "db2", label: "Agency Veteran", proof: "5 years at Buck, working on Nike, Apple, Spotify", category: "Industry" },
    { id: "db3", label: "Music Video Specialist", proof: "40+ music videos with VFX-driven narratives", category: "Niche" },
  ],
  techStack: [
    { name: "After Effects", category: "software" },
    { name: "Cinema 4D", category: "software" },
    { name: "Houdini", category: "software" },
    { name: "Unreal Engine", category: "software" },
    { name: "Trapcode Suite", category: "software" },
    { name: "DaVinci Resolve", category: "software" },
    { name: "Claude", category: "ai" },
  ],
  streakData: generateStreak(501),
  vouches: [
    { id: "dv1", creatorName: "Lena Voss", creatorHandle: "@lenavoss", creatorScore: 94, testimonial: "Dante's particle work elevated our Super Bowl spot from good to unforgettable." },
    { id: "dv2", creatorName: "Suki Tanaka", creatorHandle: "@sukicuts", creatorScore: 85, testimonial: "His C4D-to-AE bridge workflow saved me weeks of render time." },
  ],
};

const kaiProfile: CreatorProfile = {
  id: "cr_07",
  name: "Kai Nakamura",
  handle: "@kaiframes",
  niche: "Photographer Turning Filmmaker",
  bio: "10 years shooting street photography, now learning the moving image. Documenting my transition from stills to motion — every playbook is a real-time learning log.",
  authorityScore: 32,
  avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=KaiNakamura&backgroundColor=c8e6c9",
  coverGradient: "linear-gradient(135deg, #0a1a0a 0%, #166534 50%, #14532d 100%)",
  followers: 890,
  following: 156,
  openToColab: true,
  colabInterests: ["Photo-to-video transitions", "Learning from experienced editors", "Street storytelling"],
  badges: [
    { id: "kb1", label: "Fresh Voice", proof: "Top newcomer — fastest-growing authority in Photo-to-Video niche", category: "Growth" },
  ],
  techStack: [
    { name: "Sony A7IV", category: "hardware" },
    { name: "Premiere Pro", category: "software" },
    { name: "Lightroom", category: "software" },
    { name: "DaVinci Resolve", category: "software" },
    { name: "CapCut", category: "software" },
  ],
  streakData: generateStreak(701),
  vouches: [
    { id: "kv1", creatorName: "Jordan Kale", creatorHandle: "@jkale.edit", creatorScore: 78, testimonial: "Kai's photo-to-video transitions are already better than half the editors I've worked with." },
  ],
};

/* ═══════════════════════════════════════════════════
   CRED BREAKDOWNS
   ═══════════════════════════════════════════════════ */

const creds: Record<string, CredBreakdown> = {
  lenavoss:   { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 96, remixes: 90, consistency: 94 }, totalScore: 94 },
  avaframes:  { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 95, remixes: 87, consistency: 89 }, totalScore: 92 },
  marcuscuts: { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 89, remixes: 82, consistency: 90 }, totalScore: 87 },
  sukicuts:   { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 88, remixes: 80, consistency: 82 }, totalScore: 85 },
  "jkale.edit": { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 80, remixes: 76, consistency: 72 }, totalScore: 78 },
  dantevfx:   { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 72, remixes: 68, consistency: 74 }, totalScore: 71 },
  kaiframes:  { weights: { vouches: 0.6, remixes: 0.3, consistency: 0.1 }, scores: { vouches: 25, remixes: 40, consistency: 50 }, totalScore: 32 },
};

/* ═══════════════════════════════════════════════════
   NICHE EXPERTISE
   ═══════════════════════════════════════════════════ */

const expertise: Record<string, NicheExpertise[]> = {
  lenavoss: [
    { id: "le1", label: "Brand Strategy", score: 96 },
    { id: "le2", label: "Cinematography", score: 93 },
    { id: "le3", label: "Storytelling", score: 91 },
    { id: "le4", label: "Client Management", score: 88 },
    { id: "le5", label: "Color Science", score: 85 },
  ],
  avaframes: [
    { id: "ae1", label: "Sound Design", score: 96 },
    { id: "ae2", label: "Documentary", score: 91 },
    { id: "ae3", label: "Audio Engineering", score: 89 },
    { id: "ae4", label: "Storytelling", score: 85 },
    { id: "ae5", label: "Post-Production", score: 82 },
  ],
  marcuscuts: [
    { id: "me1", label: "Storytelling", score: 92 },
    { id: "me2", label: "Editing", score: 85 },
    { id: "me3", label: "AI Integration", score: 81 },
    { id: "me4", label: "Color Science", score: 74 },
    { id: "me5", label: "Sound Design", score: 68 },
  ],
  sukicuts: [
    { id: "se1", label: "AI Integration", score: 95 },
    { id: "se2", label: "Storyboarding", score: 90 },
    { id: "se3", label: "Visual Development", score: 87 },
    { id: "se4", label: "Pipeline Design", score: 83 },
    { id: "se5", label: "2D Animation", score: 78 },
  ],
  "jkale.edit": [
    { id: "je1", label: "Short-Form Editing", score: 90 },
    { id: "je2", label: "Retention Science", score: 88 },
    { id: "je3", label: "Content Strategy", score: 82 },
    { id: "je4", label: "Data Analysis", score: 76 },
    { id: "je5", label: "Motion Graphics", score: 70 },
  ],
  dantevfx: [
    { id: "de1", label: "Particle Systems", score: 88 },
    { id: "de2", label: "Motion Graphics", score: 85 },
    { id: "de3", label: "VFX Compositing", score: 82 },
    { id: "de4", label: "3D Animation", score: 78 },
    { id: "de5", label: "Sound Sync", score: 72 },
  ],
  kaiframes: [
    { id: "ke1", label: "Photography", score: 80 },
    { id: "ke2", label: "Storytelling", score: 52 },
    { id: "ke3", label: "Color Grading", score: 45 },
    { id: "ke4", label: "Editing", score: 38 },
    { id: "ke5", label: "Motion", score: 30 },
  ],
};

/* ═══════════════════════════════════════════════════
   PLAYBOOKS
   ═══════════════════════════════════════════════════ */

const lenaPlaybooks: Playbook[] = [
  {
    id: "pb_l1", title: "The Brand Film Formula", description: "End-to-end process from creative brief to final delivery. How to turn a brand's values into a 60-second emotional experience that actually converts.",
    creator: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 },
    category: "Brand Film", tags: ["Directing", "Brand Strategy", "Storytelling"],
    thumbnailGradient: "linear-gradient(135deg, #1a1408 0%, #713f12 100%)",
    duration: "24:15", version: "2.0", remixCount: 1340,
    assets: [
      { id: "la1", type: "template", label: "Creative Brief Decoder", description: "Framework for translating client briefs into shot lists", content: "## Brief Decoder\n- [ ] Core emotion (one word)\n- [ ] Brand tension (what vs what)\n- [ ] Hero moment (the frame they'll screenshot)\n- [ ] Audio signature (what does this brand sound like?)" },
      { id: "la2", type: "prompt", label: "Mood Board Generator", description: "Claude prompt that generates visual direction from a brief", content: "You are a creative director. Given this brief: {{BRIEF}}. Generate a mood board description with: 1) Color palette (5 hex codes with emotional reasoning), 2) 3 reference films/ads with timestamps, 3) Typography direction, 4) Texture/grain notes." },
      { id: "la3", type: "preset", label: "Brand Film Grade Pack", description: "12 DaVinci Resolve grades optimized for brand warmth", fileName: "lv-brand-grades.drx" },
    ],
    chapters: [
      { id: "lc1", title: "Decoding the Brief", timestamp: "0:00", timestampSeconds: 0 },
      { id: "lc2", title: "The Emotional Architecture", timestamp: "5:30", timestampSeconds: 330 },
      { id: "lc3", title: "Shot Design & Coverage", timestamp: "11:00", timestampSeconds: 660 },
      { id: "lc4", title: "Edit for Conversion", timestamp: "17:45", timestampSeconds: 1065 },
      { id: "lc5", title: "Client Review Flow", timestamp: "21:30", timestampSeconds: 1290 },
    ],
    versions: [
      { version: "2.0", date: "2026-03-15", summary: "Added AI brief decoder and expanded client flow section", isCurrent: true },
      { version: "1.0", date: "2025-09-20", summary: "Initial release — core brand film methodology", isCurrent: false },
    ],
    publishedAt: "2025-09-20", verifiedWins: 12,
  },
  {
    id: "pb_l2", title: "Cinematic B-Roll That Sells", description: "How to shoot B-roll that does the marketing work for you. Every shot is intentional, every transition carries the narrative.",
    creator: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 },
    category: "Cinematography", tags: ["B-Roll", "Shooting", "Brand Content"],
    thumbnailGradient: "linear-gradient(135deg, #0f1117 0%, #374151 100%)",
    duration: "16:30", version: "1.1", remixCount: 680,
    assets: [
      { id: "la4", type: "template", label: "B-Roll Shot List Template", description: "Categorized shot list: product, texture, environment, human, detail", content: "## B-Roll Categories\n- Product: hero angles, macro details\n- Texture: materials, surfaces, light play\n- Environment: context, scale, atmosphere\n- Human: hands, process, emotion\n- Detail: brand marks, craft moments" },
      { id: "la5", type: "prompt", label: "Shot Prioritizer", description: "AI ranks which B-roll shots will perform best for the brand", content: "Given this brand and product: {{BRAND}}. Rank these B-roll categories by impact..." },
    ],
    chapters: [
      { id: "lc6", title: "B-Roll Philosophy", timestamp: "0:00", timestampSeconds: 0 },
      { id: "lc7", title: "The 5 Categories", timestamp: "4:15", timestampSeconds: 255 },
      { id: "lc8", title: "Shooting for the Edit", timestamp: "10:30", timestampSeconds: 630 },
    ],
    versions: [{ version: "1.1", date: "2026-02-10", summary: "Added AI shot prioritizer", isCurrent: true }],
    publishedAt: "2025-11-15", verifiedWins: 5,
  },
];

const avaPlaybooks: Playbook[] = [
  {
    id: "pb_a1", title: "Sound Design for Tension & Atmosphere", description: "Layer-by-layer breakdown of how I build immersive soundscapes for thriller and horror content.",
    creator: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 },
    category: "Sound Design", tags: ["Audio", "Sound Design", "Pro Tools", "Atmosphere"],
    thumbnailGradient: "linear-gradient(135deg, #1f1c2c 0%, #302b63 100%)",
    duration: "15:38", version: "2.0", remixCount: 561,
    assets: [
      { id: "aa1", type: "template", label: "Session Template (Pro Tools)", description: "Pre-routed 24-track template with bus structure for tension layers", content: "## Track Layout\n- Bus 1: Sub-bass rumble\n- Bus 2: Mid-range drones\n- Bus 3: High-frequency textures\n- Bus 4: Foley & impacts\n- Master: Final compression + limiting" },
      { id: "aa2", type: "prompt", label: "Foley Layer Suggestor", description: "Describe the scene, AI suggests specific foley elements and their emotional function", content: "Given this scene description: {{SCENE}}. Suggest 5 foley elements that build tension. For each: 1) The sound, 2) Its frequency range, 3) Its emotional function, 4) When to introduce it." },
      { id: "aa3", type: "preset", label: "Sub-Bass Rumble Chain", description: "EQ + Compression + Saturation chain for low-end tension", fileName: "sub-rumble.ptx" },
    ],
    chapters: [
      { id: "ac1", title: "Anatomy of Tension", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ac2", title: "The 4-Layer Stack", timestamp: "3:45", timestampSeconds: 225 },
      { id: "ac3", title: "Sub-Bass & LFE", timestamp: "8:20", timestampSeconds: 500 },
      { id: "ac4", title: "Final Mix & Delivery", timestamp: "12:55", timestampSeconds: 775 },
    ],
    versions: [
      { version: "2.0", date: "2026-03-20", summary: "Added AI foley suggestor and updated bus routing", isCurrent: true },
      { version: "1.0", date: "2025-10-15", summary: "Initial sound design framework", isCurrent: false },
    ],
    publishedAt: "2025-10-15", verifiedWins: 4,
  },
  {
    id: "pb_a2", title: "Audio-First Editing Methodology", description: "Why I cut to the waveform before I touch a single clip. The sound-first approach that changed how three studios edit documentaries.",
    creator: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 },
    category: "Post-Production", tags: ["Audio", "Editing", "Documentary", "Workflow"],
    thumbnailGradient: "linear-gradient(135deg, #1a0a14 0%, #581c87 100%)",
    duration: "19:50", version: "1.0", remixCount: 340,
    assets: [
      { id: "aa4", type: "template", label: "Audio-First Timeline Setup", description: "Premiere/Resolve timeline structure that prioritizes sound", content: "## Timeline Structure\n1. V1: Scratch visuals only\n2. A1-A2: Dialogue selects\n3. A3-A4: Ambient bed\n4. A5-A6: Music stems\n5. Cut sound first → lay visuals on top" },
      { id: "aa5", type: "prompt", label: "Interview Bite Ranker", description: "AI ranks interview bites by emotional impact and narrative utility", content: "Review these interview transcripts and rank the bites by: 1) Emotional resonance, 2) Narrative utility, 3) Pacing value. Return top 10 with timestamps." },
    ],
    chapters: [
      { id: "ac5", title: "Why Audio First?", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ac6", title: "Building the Sound Bed", timestamp: "6:30", timestampSeconds: 390 },
      { id: "ac7", title: "Laying Visuals on Sound", timestamp: "13:00", timestampSeconds: 780 },
    ],
    versions: [{ version: "1.0", date: "2026-01-20", summary: "Initial release — audio-first workflow", isCurrent: true }],
    publishedAt: "2026-01-20", verifiedWins: 2,
  },
];

const marcusPlaybooks: Playbook[] = [
  {
    id: "pb_m1", title: "Cinematic Color Grading for Documentary", description: "My full color pipeline — from LOG footage to final delivery. Includes the exact DaVinci nodes, power windows, and qualifier setups I use on every doc project.",
    creator: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 },
    category: "Color & Grade", tags: ["DaVinci Resolve", "Color Science", "Documentary"],
    thumbnailGradient: "linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)",
    duration: "18:42", version: "2.1", remixCount: 847,
    assets: [
      { id: "ma1", type: "prompt", label: "Scene Analysis Prompt", description: "Claude prompt that analyzes footage mood and suggests a grade direction", content: "Analyze this documentary scene. The footage is LOG (V-Log/S-Log3). Describe the emotional tone, then suggest: 1) A primary color temperature shift, 2) A highlight/shadow split-tone pairing, 3) A contrast curve shape. Format as DaVinci Resolve node settings." },
      { id: "ma2", type: "preset", label: "Doc Warm Base — Node Tree", description: "6-node DaVinci tree: CST → Exposure → Contrast → Skin Protect → Look → Film Grain", fileName: "doc-warm-base.drx" },
      { id: "ma3", type: "lut", label: "MC-Doc-Tungsten.cube", description: "Custom 3D LUT for tungsten-lit interiors — preserves skin without orange push", fileName: "MC-Doc-Tungsten.cube" },
      { id: "ma4", type: "template", label: "Delivery Checklist", description: "Pre-export QC template: levels, gamut, loudness, HDR metadata", content: "## Delivery QC Checklist\n- [ ] Scopes: No clipping >100 IRE\n- [ ] Gamut: Rec.709 (or P3 for HDR)\n- [ ] Skin tones: 40-50 IRE, on skin line\n- [ ] Loudness: -24 LUFS broadcast / -14 streaming\n- [ ] Grain: Verify at 100% crop" },
      { id: "ma5", type: "prompt", label: "Client Revision Translator", description: "Turns vague client feedback into actionable DaVinci adjustments", content: "You are a colorist's assistant. A client says: \"{{FEEDBACK}}\". Translate this into specific DaVinci Resolve adjustments. Be precise: name the node, the tool, and the direction." },
    ],
    chapters: [
      { id: "mc1", title: "Why LOG Matters", timestamp: "0:00", timestampSeconds: 0 },
      { id: "mc2", title: "Node Tree Architecture", timestamp: "3:15", timestampSeconds: 195 },
      { id: "mc3", title: "Primary Balance", timestamp: "6:40", timestampSeconds: 400 },
      { id: "mc4", title: "Skin Tone Protection", timestamp: "9:22", timestampSeconds: 562 },
      { id: "mc5", title: "The Look Node", timestamp: "12:50", timestampSeconds: 770 },
      { id: "mc6", title: "AI-Assisted Scene Matching", timestamp: "15:30", timestampSeconds: 930 },
      { id: "mc7", title: "Export & Delivery", timestamp: "17:10", timestampSeconds: 1030 },
    ],
    versions: [
      { version: "2.1", date: "2026-03-20", summary: "Added Claude prompts for scene analysis and client feedback", isCurrent: true },
      { version: "2.0", date: "2026-02-14", summary: "Rebuilt node tree for DaVinci 19; added HDR delivery path", isCurrent: false },
      { version: "1.0", date: "2025-08-12", summary: "Initial release — 4-node grade pipeline for Rec.709", isCurrent: false },
    ],
    publishedAt: "2025-08-12", verifiedWins: 3,
  },
  {
    id: "pb_m2", title: "Pacing & Rhythm in Long-Form Edits", description: "How I use musical structure to drive pacing in 20-60 min docs. Includes my beat-mapping technique and the 'breath' theory of audience attention.",
    creator: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 },
    category: "Editing & Pacing", tags: ["Editing", "Documentary", "Pacing", "Storytelling"],
    thumbnailGradient: "linear-gradient(135deg, #0c0c1d 0%, #312e81 100%)",
    duration: "21:10", version: "1.0", remixCount: 420,
    assets: [
      { id: "ma6", type: "template", label: "Beat Map Template", description: "Timeline marker template for long-form pacing arcs", content: "## Beat Map\n- 0-3min: Hook & promise\n- 3-8min: World building (slow breath)\n- 8-12min: Rising tension\n- 12-15min: Midpoint pivot\n- 15-18min: Acceleration\n- 18-20min: Climax & resolve" },
      { id: "ma7", type: "prompt", label: "Pacing Analyzer", description: "AI reviews your cut and identifies pacing issues", content: "Review this edit timeline. Flag: 1) Sequences over 90s without a visual or audio shift, 2) Back-to-back high-energy sections with no rest, 3) Story beats that arrive before emotional setup." },
    ],
    chapters: [
      { id: "mc8", title: "The Breath Theory", timestamp: "0:00", timestampSeconds: 0 },
      { id: "mc9", title: "Musical Structure in Docs", timestamp: "7:00", timestampSeconds: 420 },
      { id: "mc10", title: "Building the Beat Map", timestamp: "14:30", timestampSeconds: 870 },
    ],
    versions: [{ version: "1.0", date: "2026-01-05", summary: "Initial pacing framework for long-form", isCurrent: true }],
    publishedAt: "2026-01-05",
  },
];

const sukiPlaybooks: Playbook[] = [
  {
    id: "pb_s1", title: "AI-Driven Storyboard Pipeline", description: "How I use Runway ML + Claude to go from script to animatic in under 2 hours. Full prompt chains included.",
    creator: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 },
    category: "Pre-Production", tags: ["AI", "Storyboarding", "Runway ML", "Claude"],
    thumbnailGradient: "linear-gradient(135deg, #0c0c1d 0%, #1a237e 100%)",
    duration: "22:05", version: "1.1", remixCount: 392,
    assets: [
      { id: "sa1", type: "prompt", label: "Script-to-Shot List", description: "Converts screenplay pages into numbered shot descriptions", content: "Break this script page into shots. For each shot: 1) Shot number, 2) Shot type (CU/MS/WS/etc), 3) Camera movement, 4) Key action, 5) Emotional beat. Format as a numbered list." },
      { id: "sa2", type: "prompt", label: "Shot-to-Image Prompt", description: "Generates Runway ML prompts from shot descriptions", content: "Convert this shot description into a Runway ML image prompt. Include: composition, lighting direction, color palette, lens equivalent, and mood keywords. Keep under 200 words." },
      { id: "sa3", type: "script", label: "Batch Runner (Python)", description: "Automates Runway API calls for full storyboard generation", content: "import runway_sdk\n\ndef generate_storyboard(shots: list[dict]) -> list[str]:\n    \"\"\"Process shot list through Runway ML.\"\"\"\n    client = runway_sdk.Client()\n    results = []\n    for shot in shots:\n        img = client.generate(prompt=shot['prompt'])\n        results.append(img.url)\n    return results" },
    ],
    chapters: [
      { id: "sc1", title: "The Pipeline Overview", timestamp: "0:00", timestampSeconds: 0 },
      { id: "sc2", title: "Script Decomposition", timestamp: "4:30", timestampSeconds: 270 },
      { id: "sc3", title: "AI Image Generation", timestamp: "11:00", timestampSeconds: 660 },
      { id: "sc4", title: "Assembling the Animatic", timestamp: "17:45", timestampSeconds: 1065 },
    ],
    versions: [
      { version: "1.1", date: "2026-03-18", summary: "Improved prompt chaining for multi-scene consistency", isCurrent: true },
      { version: "1.0", date: "2026-03-05", summary: "Initial release", isCurrent: false },
    ],
    publishedAt: "2026-03-05", verifiedWins: 1,
  },
  {
    id: "pb_s2", title: "Prompt Engineering for Visual Storytelling", description: "The art of writing AI prompts that generate usable creative assets — not just pretty pictures. Composition, lighting, and narrative intent in every prompt.",
    creator: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 },
    category: "AI & Creativity", tags: ["AI", "Prompt Engineering", "Visual Development"],
    thumbnailGradient: "linear-gradient(135deg, #0a1a1f 0%, #155e75 100%)",
    duration: "14:20", version: "1.0", remixCount: 280,
    assets: [
      { id: "sa4", type: "template", label: "Prompt Anatomy Framework", description: "The 6-part structure for production-ready AI prompts", content: "## Prompt Anatomy\n1. Subject (who/what)\n2. Composition (framing, rule of thirds)\n3. Lighting (direction, quality, color)\n4. Lens (focal length, depth of field)\n5. Mood (emotional keywords)\n6. Technical (resolution, aspect ratio)" },
      { id: "sa5", type: "prompt", label: "Style Transfer Bridge", description: "Transfers visual style from reference images to new compositions", content: "Analyze the visual style of {{REFERENCE}}: color palette, contrast ratio, grain structure, lighting quality. Now apply this style to: {{NEW_SUBJECT}}. Maintain the emotional tone while adapting the composition." },
    ],
    chapters: [
      { id: "sc5", title: "Why Prompts Fail", timestamp: "0:00", timestampSeconds: 0 },
      { id: "sc6", title: "The 6-Part Framework", timestamp: "4:00", timestampSeconds: 240 },
      { id: "sc7", title: "Style Transfer Techniques", timestamp: "10:00", timestampSeconds: 600 },
    ],
    versions: [{ version: "1.0", date: "2026-02-20", summary: "Initial prompt engineering framework", isCurrent: true }],
    publishedAt: "2026-02-20",
  },
];

const jordanPlaybooks: Playbook[] = [
  {
    id: "pb_j1", title: "Short-Form Retention Framework", description: "The exact pacing, hook, and payoff structure that took my Reels from 42% to 71% average retention.",
    creator: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 },
    category: "Editing & Pacing", tags: ["Short-Form", "Retention", "Premiere Pro"],
    thumbnailGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 100%)",
    duration: "11:20", version: "1.3", remixCount: 1203,
    assets: [
      { id: "ja1", type: "prompt", label: "Hook Analyzer", description: "AI prompt to score your first 3 seconds", content: "Watch the first 3 seconds of this video. Score the hook 1-10 on: 1) Pattern interrupt, 2) Curiosity gap, 3) Value promise, 4) Visual novelty. Suggest 3 alternative hooks." },
      { id: "ja2", type: "template", label: "Beat Map Template", description: "Premiere Pro marker template for 30/60/90s formats", content: "## Beat Map (60s)\n- 0-1s: Pattern interrupt\n- 1-3s: Curiosity hook\n- 3-8s: Context setup\n- 8-15s: First value hit\n- 15-30s: Core content\n- 30-45s: Escalation\n- 45-55s: Payoff stack\n- 55-60s: CTA or loop" },
      { id: "ja3", type: "preset", label: "Snap-Cut Transition Pack", description: "12 Premiere Pro presets for punchy cuts", fileName: "snap-cuts.prfpset" },
    ],
    chapters: [
      { id: "jc1", title: "The 1-Second Rule", timestamp: "0:00", timestampSeconds: 0 },
      { id: "jc2", title: "Beat Mapping", timestamp: "3:00", timestampSeconds: 180 },
      { id: "jc3", title: "The Payoff Stack", timestamp: "7:15", timestampSeconds: 435 },
    ],
    versions: [
      { version: "1.3", date: "2026-03-10", summary: "Added AI hook analyzer prompt", isCurrent: true },
      { version: "1.0", date: "2025-12-01", summary: "Initial pacing framework", isCurrent: false },
    ],
    publishedAt: "2025-12-01", verifiedWins: 7,
  },
  {
    id: "pb_j2", title: "The Hook Library: 50 Proven Openers", description: "50 tested hook structures categorized by niche. Each one includes the psychology behind it and real A/B test results.",
    creator: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 },
    category: "Content Strategy", tags: ["Hooks", "Short-Form", "Data-Driven"],
    thumbnailGradient: "linear-gradient(135deg, #0a1a0a 0%, #14532d 100%)",
    duration: "8:45", version: "1.0", remixCount: 890,
    assets: [
      { id: "ja4", type: "template", label: "Hook Category Matrix", description: "50 hooks sorted by psychology type: curiosity, fear, aspiration, controversy, novelty", content: "## Hook Types\n1. Curiosity Gap: 'Nobody talks about...'\n2. Fear of Missing Out: 'If you're still doing X...'\n3. Aspiration: 'How I went from X to Y'\n4. Controversy: 'Unpopular opinion...'\n5. Novelty: 'I just discovered...'" },
      { id: "ja5", type: "prompt", label: "Hook Generator", description: "Generates custom hooks for any niche based on the 50 proven structures", content: "Generate 5 hooks for {{NICHE}} content using these proven structures: curiosity gap, fear-based, aspiration, social proof, novelty. Include the psychological trigger for each." },
    ],
    chapters: [
      { id: "jc4", title: "Why Hooks Matter More Than Content", timestamp: "0:00", timestampSeconds: 0 },
      { id: "jc5", title: "The 5 Psychology Types", timestamp: "2:30", timestampSeconds: 150 },
      { id: "jc6", title: "Building Your Hook Bank", timestamp: "6:00", timestampSeconds: 360 },
    ],
    versions: [{ version: "1.0", date: "2026-02-15", summary: "50 hooks with A/B test data", isCurrent: true }],
    publishedAt: "2026-02-15", verifiedWins: 3,
  },
];

const dantePlaybooks: Playbook[] = [
  {
    id: "pb_d1", title: "Particle Systems for Music Videos", description: "From sparks to galaxy simulations — how I design particle systems that sync to the beat and tell the story the artist can't say with words.",
    creator: { name: "Dante Morales", handle: "@dantevfx", authorityScore: 71 },
    category: "VFX & Motion", tags: ["After Effects", "Trapcode", "Music Video", "Particles"],
    thumbnailGradient: "linear-gradient(135deg, #1a0005 0%, #5b1a1a 100%)",
    duration: "17:30", version: "1.0", remixCount: 310,
    assets: [
      { id: "da1", type: "preset", label: "Beat-Sync Particle Rig", description: "After Effects expression rig that drives particle parameters from audio amplitude", fileName: "beat-sync-particles.aep" },
      { id: "da2", type: "template", label: "Particle Design Playsheet", description: "Worksheet for designing particle behaviors before opening the software", content: "## Particle Design Sheet\n- Emotion: [word]\n- Birth behavior: [explosion/stream/bloom]\n- Life span: [frames]\n- Death behavior: [fade/shrink/scatter]\n- Color journey: [start → end]\n- Audio link: [bass/mid/high]" },
      { id: "da3", type: "prompt", label: "VFX Brief-to-Parameters", description: "Translates a creative brief into specific particle parameters", content: "Given this music video concept: {{BRIEF}}. Define particle system parameters: emitter type, birth rate, velocity, turbulence, color over life, size over life, and audio reactivity mapping." },
    ],
    chapters: [
      { id: "dc1", title: "Particles as Storytelling", timestamp: "0:00", timestampSeconds: 0 },
      { id: "dc2", title: "Designing on Paper First", timestamp: "4:00", timestampSeconds: 240 },
      { id: "dc3", title: "Beat-Sync Expression Rig", timestamp: "9:30", timestampSeconds: 570 },
      { id: "dc4", title: "Rendering & Compositing", timestamp: "14:00", timestampSeconds: 840 },
    ],
    versions: [{ version: "1.0", date: "2026-03-12", summary: "Initial particle systems framework", isCurrent: true }],
    publishedAt: "2026-03-12", verifiedWins: 2,
  },
  {
    id: "pb_d2", title: "After Effects to Cinema 4D Bridge", description: "Seamless pipeline for moving between 2D compositing and 3D rendering. Camera data, lighting, and render passes — no guesswork.",
    creator: { name: "Dante Morales", handle: "@dantevfx", authorityScore: 71 },
    category: "3D & Compositing", tags: ["After Effects", "Cinema 4D", "Pipeline", "3D"],
    thumbnailGradient: "linear-gradient(135deg, #0f0f23 0%, #1e1b4b 100%)",
    duration: "13:15", version: "1.0", remixCount: 185,
    assets: [
      { id: "da4", type: "template", label: "Render Pass Checklist", description: "Which passes to export and how to composite them in AE", content: "## Essential Passes\n1. Beauty (RGBA)\n2. Depth (Z-buffer)\n3. Normals\n4. Object ID\n5. Ambient Occlusion\n6. Reflection\n7. Shadow Catcher" },
      { id: "da5", type: "script", label: "Camera Export Script", description: "Python script to export AE camera data to C4D format", content: "# ae_to_c4d_camera.py\n# Exports After Effects camera keyframes to Cinema 4D compatible format\nimport json\n\ndef convert_ae_camera(ae_data: dict) -> dict:\n    # Convert AE coordinate system to C4D\n    pass" },
    ],
    chapters: [
      { id: "dc5", title: "Why Bridge Matters", timestamp: "0:00", timestampSeconds: 0 },
      { id: "dc6", title: "Camera & Lighting Sync", timestamp: "4:30", timestampSeconds: 270 },
      { id: "dc7", title: "Render Pass Compositing", timestamp: "9:00", timestampSeconds: 540 },
    ],
    versions: [{ version: "1.0", date: "2026-02-28", summary: "Initial AE-C4D bridge pipeline", isCurrent: true }],
    publishedAt: "2026-02-28",
  },
];

const kaiPlaybooks: Playbook[] = [
  {
    id: "pb_k1", title: "Photo-to-Video Transition Pack", description: "My real-time learning log: how a street photographer is learning motion. 12 transition techniques that bridge stills and video thinking.",
    creator: { name: "Kai Nakamura", handle: "@kaiframes", authorityScore: 32 },
    category: "Transitions", tags: ["Photography", "Video", "Transitions", "Beginner"],
    thumbnailGradient: "linear-gradient(135deg, #0a1a0a 0%, #166534 100%)",
    duration: "9:40", version: "1.0", remixCount: 87,
    assets: [
      { id: "ka1", type: "template", label: "Transition Catalog", description: "12 photo-to-video transitions with difficulty ratings", content: "## Transitions (Easy → Hard)\n1. ★ Freeze-to-motion\n2. ★ Whip pan\n3. ★★ Parallax slide\n4. ★★ Focus rack reveal\n5. ★★★ Match cut (shape)\n6. ★★★ Match cut (motion)" },
      { id: "ka2", type: "preset", label: "Freeze Frame Transition", description: "Premiere preset for smooth photo-to-video reveal", fileName: "freeze-reveal.prfpset" },
    ],
    chapters: [
      { id: "kc1", title: "A Photographer's Perspective", timestamp: "0:00", timestampSeconds: 0 },
      { id: "kc2", title: "6 Easy Transitions", timestamp: "3:00", timestampSeconds: 180 },
      { id: "kc3", title: "6 Advanced Transitions", timestamp: "6:30", timestampSeconds: 390 },
    ],
    versions: [{ version: "1.0", date: "2026-03-21", summary: "First playbook — 12 photo-to-video transitions", isCurrent: true }],
    publishedAt: "2026-03-21",
  },
];

/* ═══════════════════════════════════════════════════
   TRANSACTIONS (per user)
   ═══════════════════════════════════════════════════ */

const transactions: Record<string, CredTransaction[]> = {
  lenavoss: [
    { id: "lt1", type: "trophy", points: 250, description: "Your doc graded with Marcus Chen's playbook won Best Cinematography at SXSW Shorts", createdAt: "2026-03-23", relatedPlaybook: "Cinematic Color Grading for Documentary" },
    { id: "lt2", type: "vouch", points: 53, description: "Marcus Chen vouched for your Brand Strategy expertise", fromUser: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, createdAt: "2026-03-20" },
    { id: "lt3", type: "remix", points: 140, description: "Brand Film Formula remixed 65× this week", createdAt: "2026-03-18", relatedPlaybook: "The Brand Film Formula" },
    { id: "lt4", type: "vouch", points: 56, description: "Ava Rodriguez vouched for your Cinematography", fromUser: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 }, createdAt: "2026-03-15" },
    { id: "lt5", type: "milestone", points: 50, description: "Reached Top 1% — highest Authority Score on the platform", createdAt: "2026-03-10" },
  ],
  avaframes: [
    { id: "at1", type: "vouch", points: 51, description: "Suki Tanaka vouched for your Sound Design methods", fromUser: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, createdAt: "2026-03-22" },
    { id: "at2", type: "trophy", points: 180, description: "Lena Voss's remix of your Tension playbook won at Cannes Brand Lions", createdAt: "2026-03-19", relatedPlaybook: "Sound Design for Tension & Atmosphere" },
    { id: "at3", type: "remix", points: 90, description: "Audio-First Editing remixed 35× this month", createdAt: "2026-03-17", relatedPlaybook: "Audio-First Editing Methodology" },
    { id: "at4", type: "milestone", points: 30, description: "Reached Authority Score 92 — Top 3% of all creators", createdAt: "2026-03-17" },
    { id: "at5", type: "vouch", points: 57, description: "Lena Voss vouched for your Audio Engineering", fromUser: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, createdAt: "2026-03-14" },
  ],
  marcuscuts: [
    { id: "mt1", type: "vouch", points: 55, description: "Ava Rodriguez vouched for your Color Science expertise", fromUser: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 }, createdAt: "2026-03-22" },
    { id: "mt2", type: "remix", points: 120, description: "Color Grading playbook remixed 50× this week", createdAt: "2026-03-21", relatedPlaybook: "Cinematic Color Grading for Documentary" },
    { id: "mt3", type: "trophy", points: 200, description: "Lena Voss's doc won SXSW Best Cinematography using your grade pipeline", fromUser: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, createdAt: "2026-03-23", relatedPlaybook: "Cinematic Color Grading for Documentary" },
    { id: "mt4", type: "vouch", points: 51, description: "Suki Tanaka vouched for your Editing approach", fromUser: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, createdAt: "2026-03-18" },
    { id: "mt5", type: "milestone", points: 25, description: "30-day creation streak achieved", createdAt: "2026-03-19" },
  ],
  sukicuts: [
    { id: "st1", type: "vouch", points: 43, description: "Dante Morales vouched for your Pipeline Design", fromUser: { name: "Dante Morales", handle: "@dantevfx", authorityScore: 71 }, createdAt: "2026-03-20" },
    { id: "st2", type: "trophy", points: 150, description: "Your storyboard pipeline remix was used in a Netflix pilot pre-vis", createdAt: "2026-03-19" },
    { id: "st3", type: "remix", points: 75, description: "AI Storyboard Pipeline remixed 25× this week", createdAt: "2026-03-18", relatedPlaybook: "AI-Driven Storyboard Pipeline" },
    { id: "st4", type: "vouch", points: 53, description: "Marcus Chen vouched for your AI Integration", fromUser: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, createdAt: "2026-03-15" },
  ],
  "jkale.edit": [
    { id: "jt1", type: "trophy", points: 200, description: "Client hit 71% retention using your framework — up from 42%", createdAt: "2026-03-22", relatedPlaybook: "Short-Form Retention Framework" },
    { id: "jt2", type: "remix", points: 100, description: "Hook Library remixed 45× this month", createdAt: "2026-03-19", relatedPlaybook: "The Hook Library: 50 Proven Openers" },
    { id: "jt3", type: "vouch", points: 53, description: "Marcus Chen vouched for your Retention Science", fromUser: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, createdAt: "2026-03-16" },
    { id: "jt4", type: "vouch", points: 57, description: "Lena Voss vouched for your Content Strategy", fromUser: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, createdAt: "2026-03-12" },
  ],
  dantevfx: [
    { id: "dt1", type: "vouch", points: 57, description: "Lena Voss vouched for your Particle Systems work", fromUser: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, createdAt: "2026-03-18" },
    { id: "dt2", type: "remix", points: 60, description: "Particle Systems playbook remixed 20× this month", createdAt: "2026-03-17", relatedPlaybook: "Particle Systems for Music Videos" },
    { id: "dt3", type: "vouch", points: 51, description: "Suki Tanaka vouched for your 3D Animation skills", fromUser: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, createdAt: "2026-03-14" },
    { id: "dt4", type: "milestone", points: 25, description: "Reached Authority Score 71 — unlocked Vouch privileges", createdAt: "2026-03-12" },
  ],
  kaiframes: [
    { id: "kt1", type: "vouch", points: 47, description: "Jordan Kale vouched for your creative eye", fromUser: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 }, createdAt: "2026-03-22" },
    { id: "kt2", type: "remix", points: 30, description: "Transition Pack remixed 87× in first 48 hours", createdAt: "2026-03-22", relatedPlaybook: "Photo-to-Video Transition Pack" },
    { id: "kt3", type: "milestone", points: 15, description: "Published first playbook — welcome to The Hub", createdAt: "2026-03-21" },
  ],
};

/* ═══════════════════════════════════════════════════
   DIRECTOR'S NOTES (per user's featured playbook)
   ═══════════════════════════════════════════════════ */

const directorNotes: Record<string, DirectorNote[]> = {
  lenavoss: [
    { id: "ln1", author: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, timestamp: "5:30", content: "The emotional architecture framework here is something they should teach in film school. I restructured an entire doc edit after watching this section.", createdAt: "2026-03-21", type: "praise" },
    { id: "ln2", author: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 }, assetRef: "Mood Board Generator", content: "This prompt is incredible for sound design too. I adapted it to generate audio mood boards and it nailed the tone every time.", createdAt: "2026-03-18", type: "feedback" },
  ],
  avaframes: [
    { id: "an1", author: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, timestamp: "3:45", content: "The 4-layer stack completely changed how I think about audio in brand films. Applied it on our last Super Bowl spot.", createdAt: "2026-03-20", type: "praise" },
    { id: "an2", author: { name: "Dante Morales", handle: "@dantevfx", authorityScore: 71 }, assetRef: "Foley Layer Suggestor", content: "This AI prompt suggested using 'ticking clock foley at 2kHz for cognitive urgency' — something I never would have thought of. Brilliant.", createdAt: "2026-03-17", type: "praise" },
    { id: "an3", author: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, timestamp: "12:55", content: "The final mix section could use more detail on loudness normalization differences between platforms. -14 LUFS for YouTube vs -16 for Spotify?", createdAt: "2026-03-15", type: "suggestion" },
  ],
  marcuscuts: [
    { id: "mn1", author: { name: "Ava Rodriguez", handle: "@avaframes", authorityScore: 92 }, timestamp: "6:40", content: "The way you handle the skin tone qualifier here is brilliant. I've been protecting skin tones wrong for years.", createdAt: "2026-03-21", type: "praise" },
    { id: "mn2", author: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 }, assetRef: "Scene Analysis Prompt", content: "This prompt is exceptional. I tweaked it for wildlife docs and the grade suggestions were 90% usable out of the box.", createdAt: "2026-03-19", type: "feedback" },
    { id: "mn3", author: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, timestamp: "15:30", content: "The AI scene matching section needs more detail on prompt chaining for multi-scene projects. Consistency dropped after scene 15 for me.", createdAt: "2026-03-18", type: "suggestion" },
  ],
  sukicuts: [
    { id: "sn1", author: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, timestamp: "4:30", content: "The script decomposition method is incredibly systematic. Applied it to a brand narrative and got usable storyboards in 40 minutes.", createdAt: "2026-03-20", type: "praise" },
    { id: "sn2", author: { name: "Dante Morales", handle: "@dantevfx", authorityScore: 71 }, assetRef: "Batch Runner (Python)", content: "The batch runner is clean but consider adding retry logic — Runway's API throttles after 20 consecutive calls.", createdAt: "2026-03-17", type: "suggestion" },
  ],
  "jkale.edit": [
    { id: "jn1", author: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, timestamp: "3:00", content: "The beat mapping technique applies perfectly to long-form brand content too. I adapted the 60s framework to 3-minute brand films.", createdAt: "2026-03-18", type: "feedback" },
    { id: "jn2", author: { name: "Marcus Chen", handle: "@marcuscuts", authorityScore: 87 }, assetRef: "Hook Analyzer", content: "This AI hook analyzer is legitimately better than most junior editors at identifying weak openings. We use it in our review pipeline now.", createdAt: "2026-03-15", type: "praise" },
  ],
  dantevfx: [
    { id: "dn1", author: { name: "Suki Tanaka", handle: "@sukicuts", authorityScore: 85 }, timestamp: "9:30", content: "The beat-sync expression rig is genius. I used it for an animated storyboard and the particles perfectly matched the temp score.", createdAt: "2026-03-19", type: "praise" },
    { id: "dn2", author: { name: "Lena Voss", handle: "@lenavoss", authorityScore: 94 }, assetRef: "VFX Brief-to-Parameters", content: "This prompt translated 'make it feel like burning nostalgia' into actual Trapcode settings. That's magic.", createdAt: "2026-03-16", type: "praise" },
  ],
  kaiframes: [
    { id: "kn1", author: { name: "Jordan Kale", handle: "@jkale.edit", authorityScore: 78 }, timestamp: "3:00", content: "These transitions have a photographer's eye that most video-first creators miss. The parallax slide is beautiful.", createdAt: "2026-03-22", type: "praise" },
  ],
};

/* ═══════════════════════════════════════════════════
   ASSEMBLY
   ═══════════════════════════════════════════════════ */

const profiles = [lenaProfile, avaProfile, marcusProfile, sukiProfile, jordanProfile, danteProfile, kaiProfile];
const playbooks = [lenaPlaybooks, avaPlaybooks, marcusPlaybooks, sukiPlaybooks, jordanPlaybooks, dantePlaybooks, kaiPlaybooks];

export const hubUsers: HubUser[] = profiles.map((profile, i) => {
  const handle = u(profile.handle);
  return {
    profile,
    cred: creds[handle],
    expertise: expertise[handle],
    playbooks: playbooks[i],
    transactions: transactions[handle],
    directorNotes: directorNotes[handle] ?? [],
  };
});

export function getUserByHandle(handle: string): HubUser | undefined {
  return hubUsers.find((u) => u.profile.handle === `@${handle}` || u.profile.handle === handle);
}

export function getAllUsers(): HubUser[] {
  return hubUsers;
}

export function getAllPlaybooks(): Playbook[] {
  return hubUsers.flatMap((u) => u.playbooks);
}

/* ═══════════════════════════════════════════════════
   GLOBAL FEED EVENTS
   ═══════════════════════════════════════════════════ */

/* Avatar lookup for feed events */
const avatars: Record<string, string> = {
  lenavoss: lenaProfile.avatarUrl,
  avaframes: avaProfile.avatarUrl,
  marcuscuts: marcusProfile.avatarUrl,
  sukicuts: sukiProfile.avatarUrl,
  "jkale.edit": jordanProfile.avatarUrl,
  dantevfx: danteProfile.avatarUrl,
  kaiframes: kaiProfile.avatarUrl,
};

function actor(name: string, handle: string, score: number) {
  return { name, handle, authorityScore: score, avatarUrl: avatars[handle] };
}

export const feedEvents: FeedEvent[] = [
  {
    id: "fe01", type: "trophy", timeAgo: "2h",
    actor: actor("Lena Voss", "lenavoss", 94),
    target: actor("Marcus Chen", "marcuscuts", 87),
    content: "Lena Voss's documentary, graded using Marcus Chen's playbook, won Best Cinematography at SXSW Shorts",
    relatedPlaybook: "Cinematic Color Grading for Documentary",
    metrics: { label: "Festival Rank", value: "#1 of 2,400 entries" },
    likes: 284, comments: 47, shares: 92,
  },
  {
    id: "fe_colab01", type: "colab", timeAgo: "3h",
    actor: actor("Lena Voss", "lenavoss", 94),
    target: actor("Ava Rodriguez", "avaframes", 92),
    content: "Lena Voss and Ava Rodriguez started a Colab: 'The Sensory Brand Film'",
    detail: "Brand film direction meets immersive sound design — a new playbook that redefines how brand films feel.",
    metrics: { label: "Skill Synergies", value: "3 matches" },
    likes: 312, comments: 54, shares: 98,
  },
  {
    id: "fe02", type: "vouch", timeAgo: "5h",
    actor: actor("Ava Rodriguez", "avaframes", 92),
    target: actor("Marcus Chen", "marcuscuts", 87),
    content: "Ava Rodriguez vouched for Marcus Chen's Color Science expertise",
    detail: "His color grading playbook saved our studio 40 hours on a Netflix doc. Surgical precision.",
    likes: 156, comments: 23, shares: 34,
  },
  {
    id: "fe03", type: "remix", timeAgo: "8h",
    actor: actor("Jordan Kale", "jkale.edit", 78),
    target: actor("Suki Tanaka", "sukicuts", 85),
    content: "Jordan Kale remixed Suki Tanaka's AI Storyboard Pipeline for short-form pre-visualization",
    relatedPlaybook: "AI-Driven Storyboard Pipeline",
    likes: 89, comments: 12, shares: 45,
  },
  {
    id: "fe_colab02", type: "colab", timeAgo: "10h",
    actor: actor("Suki Tanaka", "sukicuts", 85),
    target: actor("Dante Morales", "dantevfx", 71),
    content: "Suki Tanaka and Dante Morales started a Colab: 'AI Pre-Vis to VFX'",
    detail: "AI-generated storyboards that come alive with particle systems — concept-to-motion in a single afternoon.",
    metrics: { label: "Skill Synergies", value: "3 matches" },
    likes: 198, comments: 32, shares: 67,
  },
  {
    id: "fe04", type: "publish", timeAgo: "12h",
    actor: actor("Dante Morales", "dantevfx", 71),
    content: "Dante Morales published a new playbook: Particle Systems for Music Videos",
    relatedPlaybook: "Particle Systems for Music Videos",
    detail: "From sparks to galaxy simulations — particle systems that sync to the beat and tell the story.",
    likes: 203, comments: 38, shares: 67,
  },
  {
    id: "fe05", type: "trophy", timeAgo: "1d",
    actor: actor("Jordan Kale", "jkale.edit", 78),
    target: actor("Marcus Chen", "marcuscuts", 87),
    content: "Jordan Kale's client saw 71% retention using Marcus Chen's Retention Framework — up from 42%",
    relatedPlaybook: "Short-Form Retention Framework",
    metrics: { label: "Retention Lift", value: "42% → 71%" },
    likes: 341, comments: 56, shares: 128,
  },
  {
    id: "fe06", type: "vouch", timeAgo: "1d",
    actor: actor("Suki Tanaka", "sukicuts", 85),
    target: actor("Ava Rodriguez", "avaframes", 92),
    content: "Suki Tanaka vouched for Ava Rodriguez's Sound Design methods",
    detail: "The only sound designer whose foley suggestions I trust without previewing. Consistently battle-tested.",
    likes: 112, comments: 18, shares: 29,
  },
  {
    id: "fe07", type: "milestone", timeAgo: "2d",
    actor: actor("Kai Nakamura", "kaiframes", 32),
    content: "Kai Nakamura published their first playbook and reached Authority Score 32",
    relatedPlaybook: "Photo-to-Video Transition Pack",
    detail: "A photographer's journey into motion — 87 remixes in the first 48 hours.",
    likes: 445, comments: 89, shares: 156,
  },
  {
    id: "fe08", type: "remix", timeAgo: "2d",
    actor: actor("Lena Voss", "lenavoss", 94),
    target: actor("Ava Rodriguez", "avaframes", 92),
    content: "Lena Voss remixed Ava Rodriguez's Tension & Atmosphere playbook for brand horror content",
    relatedPlaybook: "Sound Design for Tension & Atmosphere",
    detail: "Applied the 4-layer tension stack to a luxury horror spot for a fashion house.",
    likes: 178, comments: 31, shares: 55,
  },
  {
    id: "fe09", type: "vouch", timeAgo: "3d",
    actor: actor("Dante Morales", "dantevfx", 71),
    target: actor("Suki Tanaka", "sukicuts", 85),
    content: "Dante Morales vouched for Suki Tanaka's Pipeline Design",
    detail: "Her storyboard pipeline cut our pre-vis time in half. Game-changer for music video pre-production.",
    likes: 67, comments: 9, shares: 21,
  },
  {
    id: "fe10", type: "publish", timeAgo: "3d",
    actor: actor("Ava Rodriguez", "avaframes", 92),
    content: "Ava Rodriguez published v2.0 of Sound Design for Tension & Atmosphere",
    relatedPlaybook: "Sound Design for Tension & Atmosphere",
    detail: "Major update: added AI foley suggestor prompt and rebuilt the Pro Tools bus routing.",
    likes: 234, comments: 42, shares: 78,
  },
  {
    id: "fe11", type: "trophy", timeAgo: "4d",
    actor: actor("Suki Tanaka", "sukicuts", 85),
    content: "Suki Tanaka's AI storyboard pipeline remix was used in a Netflix pilot pre-visualization",
    relatedPlaybook: "AI-Driven Storyboard Pipeline",
    metrics: { label: "Production", value: "Netflix Original Pilot" },
    likes: 512, comments: 78, shares: 201,
  },
  {
    id: "fe12", type: "remix", timeAgo: "5d",
    actor: actor("Marcus Chen", "marcuscuts", 87),
    target: actor("Dante Morales", "dantevfx", 71),
    content: "Marcus Chen remixed Dante Morales's AE-to-C4D Bridge for his documentary workflow",
    relatedPlaybook: "After Effects to Cinema 4D Bridge",
    likes: 94, comments: 15, shares: 33,
  },
  {
    id: "fe13", type: "vouch", timeAgo: "5d",
    actor: actor("Lena Voss", "lenavoss", 94),
    target: actor("Dante Morales", "dantevfx", 71),
    content: "Lena Voss vouched for Dante Morales's Particle Systems work",
    detail: "Dante's particle work elevated our Super Bowl spot from good to unforgettable.",
    likes: 189, comments: 27, shares: 44,
  },
  {
    id: "fe14", type: "milestone", timeAgo: "6d",
    actor: actor("Ava Rodriguez", "avaframes", 92),
    content: "Ava Rodriguez reached Authority Score 92 — now in the Top 3% of all creators",
    metrics: { label: "Percentile", value: "Top 3%" },
    likes: 267, comments: 45, shares: 89,
  },
  {
    id: "fe15", type: "publish", timeAgo: "7d",
    actor: actor("Lena Voss", "lenavoss", 94),
    content: "Lena Voss published The Brand Film Formula v2.0 with AI brief decoder",
    relatedPlaybook: "The Brand Film Formula",
    detail: "End-to-end brand film process — from creative brief to final delivery. Now with Claude integration.",
    likes: 378, comments: 62, shares: 134,
  },
];

/* ═══════════════════════════════════════════════════
   FEED POSTS (Videos & Text)
   ═══════════════════════════════════════════════════ */

export const feedPosts: FeedPost[] = [
  {
    id: "fp01", type: "video", timeAgo: "1h",
    author: actor("Lena Voss", "lenavoss", 94),
    content: "Here's the exact moment the client went from 'this is nice' to 'this is the one.' It's always about the emotional turn in the middle third. Sharing the full breakdown from my Brand Film Formula playbook.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #1a1408 0%, #713f12 50%, #b45309 100%)",
      duration: "3:42",
      title: "The Emotional Turn — Brand Film Formula (Ch. 2)",
    },
    relatedPlaybook: "The Brand Film Formula",
    tags: ["Brand Film", "Directing", "Storytelling"],
    likes: 467, comments: 83, shares: 124,
  },
  {
    id: "fp02", type: "text", timeAgo: "3h",
    author: actor("Marcus Chen", "marcuscuts", 87),
    content: "Spent all morning A/B testing warm vs cool grades on the same interview sequence. The warm grade had 23% longer average watch time. Color isn't decoration — it's retention infrastructure.\n\nFull node tree and settings are in my Color Grading playbook, Chapter 5: The Look Node.",
    relatedPlaybook: "Cinematic Color Grading for Documentary",
    tags: ["Color Science", "DaVinci Resolve", "Data"],
    likes: 312, comments: 57, shares: 89,
  },
  {
    id: "fp03", type: "video", timeAgo: "5h",
    author: actor("Ava Rodriguez", "avaframes", 92),
    content: "People ask how I build tension in sound design without jump scares. The answer is sub-bass. Here's a 2-minute walkthrough of the rumble chain from my Tension & Atmosphere playbook — the layer you feel before you hear it.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #1f1c2c 0%, #302b63 50%, #24243e 100%)",
      duration: "2:18",
      title: "Sub-Bass Rumble Chain — Tension Walkthrough",
    },
    relatedPlaybook: "Sound Design for Tension & Atmosphere",
    tags: ["Sound Design", "Pro Tools", "Atmosphere"],
    likes: 389, comments: 62, shares: 101,
  },
  {
    id: "fp04", type: "text", timeAgo: "8h",
    author: actor("Jordan Kale", "jkale.edit", 78),
    content: "Hot take: if your hook doesn't work without audio, it doesn't work.\n\n85% of mobile users scroll with sound off. Your first frame IS your hook. I've been testing visual-only hooks for 6 months — here are the 5 patterns that consistently beat 65% retention. All in the Hook Library playbook.",
    relatedPlaybook: "The Hook Library: 50 Proven Openers",
    tags: ["Short-Form", "Retention", "Hooks"],
    likes: 521, comments: 94, shares: 187,
  },
  {
    id: "fp05", type: "video", timeAgo: "10h",
    author: actor("Suki Tanaka", "sukicuts", 85),
    content: "Script → storyboard → animatic in 47 minutes. This is the full AI pipeline in action. No editing, no cuts — real-time screen recording of the entire workflow from my Storyboard Pipeline playbook.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #0c0c1d 0%, #1a237e 50%, #283593 100%)",
      duration: "8:12",
      title: "Script-to-Animatic: Full AI Pipeline (Real-Time)",
    },
    relatedPlaybook: "AI-Driven Storyboard Pipeline",
    tags: ["AI", "Storyboarding", "Pipeline"],
    likes: 298, comments: 45, shares: 76,
  },
  {
    id: "fp06", type: "video", timeAgo: "14h",
    author: actor("Dante Morales", "dantevfx", 71),
    content: "What happens when you map particle birth rate to bass frequencies? This. Beat-reactive particles for a hip-hop video — every hit spawns a new burst. Expression rig is in my Particle Systems playbook.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #1a0005 0%, #5b1a1a 50%, #b91c1c 100%)",
      duration: "1:44",
      title: "Beat-Sync Particles: Bass-Reactive Burst Demo",
    },
    relatedPlaybook: "Particle Systems for Music Videos",
    tags: ["VFX", "After Effects", "Particles"],
    likes: 234, comments: 41, shares: 68,
  },
  {
    id: "fp07", type: "text", timeAgo: "16h",
    author: actor("Kai Nakamura", "kaiframes", 32),
    content: "Week 3 of my photo-to-video journey. Biggest lesson: photographers frame for a moment, filmmakers frame for movement. Same composition rules, different dimension.\n\nI documented 12 transitions that bridge both worlds in my first playbook. The parallax slide is the one that made it all click.",
    relatedPlaybook: "Photo-to-Video Transition Pack",
    tags: ["Photography", "Video", "Transitions"],
    likes: 178, comments: 34, shares: 52,
  },
  {
    id: "fp08", type: "video", timeAgo: "1d",
    author: actor("Marcus Chen", "marcuscuts", 87),
    content: "The 'breath theory' of pacing: every 3-4 minutes, your audience needs to exhale. Here's a side-by-side of a doc sequence before and after applying the beat map. The retention curve difference is wild.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #0c0c1d 0%, #312e81 50%, #4338ca 100%)",
      duration: "4:55",
      title: "Breath Theory: Before/After Pacing Comparison",
    },
    relatedPlaybook: "Pacing & Rhythm in Long-Form Edits",
    tags: ["Editing", "Pacing", "Documentary"],
    likes: 356, comments: 68, shares: 112,
  },
  {
    id: "fp09", type: "text", timeAgo: "1d",
    author: actor("Lena Voss", "lenavoss", 94),
    content: "Client asked for 'cinematic B-roll that tells a story.' I sent them a 5-category shot list before touching a camera. Product, texture, environment, human, detail — each category serves a different narrative function.\n\nThe shot list template is free in my Cinematic B-Roll playbook. Use it before your next shoot.",
    relatedPlaybook: "Cinematic B-Roll That Sells",
    tags: ["Cinematography", "B-Roll", "Brand Content"],
    likes: 412, comments: 71, shares: 143,
  },
  {
    id: "fp10", type: "video", timeAgo: "2d",
    author: actor("Ava Rodriguez", "avaframes", 92),
    content: "Why I cut audio before I touch a single video clip. The sound bed IS the edit. Here's how I assembled a 20-minute doc entirely from the waveform first — visuals came last.",
    video: {
      thumbnailGradient: "linear-gradient(135deg, #1a0a14 0%, #581c87 50%, #7e22ce 100%)",
      duration: "6:30",
      title: "Audio-First Editing: Sound Bed Assembly",
    },
    relatedPlaybook: "Audio-First Editing Methodology",
    tags: ["Audio", "Editing", "Documentary"],
    likes: 287, comments: 53, shares: 88,
  },
];

/* ═══════════════════════════════════════════════════
   COLAB PROPOSALS
   ═══════════════════════════════════════════════════ */

export const colabProposals: ColabProposal[] = [
  {
    id: "colab_01",
    from: actor("Lena Voss", "lenavoss", 94),
    to: actor("Ava Rodriguez", "avaframes", 92),
    vision: "Let's build a playbook together — 'The Sensory Brand Film.' Your tension layering approach applied to luxury brand storytelling. I'll handle the visual architecture, you own the soundscape. The result could redefine how brand films feel.",
    skillSynergies: ["Brand Strategy + Sound Design", "Cinematography + Audio Engineering", "Client Management + Studio Workflow"],
    status: "active",
    createdAt: "2026-03-20",
  },
  {
    id: "colab_02",
    from: actor("Suki Tanaka", "sukicuts", 85),
    to: actor("Dante Morales", "dantevfx", 71),
    vision: "Your particle systems are the missing piece in AI-generated storyboards. I want to colab on an 'AI Pre-Vis to VFX' pipeline — storyboard frames that come alive with your particle rigs. Think concept-to-motion in a single afternoon.",
    skillSynergies: ["AI Integration + VFX Compositing", "Storyboarding + Motion Graphics", "Pipeline Design + 3D Animation"],
    status: "active",
    createdAt: "2026-03-18",
  },
  {
    id: "colab_03",
    from: actor("Marcus Chen", "marcuscuts", 87),
    to: actor("Jordan Kale", "jkale.edit", 78),
    vision: "Your retention science + my color grading = a playbook that proves how grade choices affect watch time. Let's A/B test color palettes against retention curves. Nobody's done this with real data.",
    skillSynergies: ["Color Science + Data Analysis", "Editing + Retention Science", "Storytelling + Content Strategy"],
    status: "pending",
    createdAt: "2026-03-22",
  },
  {
    id: "colab_04",
    from: actor("Jordan Kale", "jkale.edit", 78),
    to: actor("Kai Nakamura", "kaiframes", 32),
    vision: "Your photographer's eye is exactly what short-form needs — most editors think video-first and miss the composition. Let's colab on a 'Stills-to-Reels' playbook that bridges your framing instincts with my retention framework.",
    skillSynergies: ["Retention Science + Photography", "Short-Form Editing + Visual Composition"],
    status: "pending",
    createdAt: "2026-03-23",
  },
];

/* ═══════════════════════════════════════════════════
   PLATFORM STATS
   ═══════════════════════════════════════════════════ */

export const platformStats = {
  activeCreators: 3247,
  publishedPlaybooks: 847,
  totalRemixes: 12400,
  verifiedWins: 89,
  avgAuthorityScore: 64,
  activeColabs: 12,
};
