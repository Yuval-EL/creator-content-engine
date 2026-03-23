import type { Playbook } from "../types";

export const mockPlaybooks: Playbook[] = [
  {
    id: "pb_01",
    title: "Cinematic Color Grading for Documentary",
    description:
      "My full color pipeline — from LOG footage to final delivery. Includes the exact DaVinci nodes, power windows, and qualifier setups I use on every doc project.",
    creator: {
      name: "Marcus Chen",
      handle: "@marcuscuts",
      authorityScore: 87,
    },
    category: "Color & Grade",
    tags: ["DaVinci Resolve", "Color Science", "Documentary"],
    thumbnailGradient: "linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)",
    duration: "18:42",
    version: "2.1",
    remixCount: 847,
    assets: [
      {
        id: "a1",
        type: "prompt",
        label: "Scene Analysis Prompt",
        description: "Claude prompt that analyzes footage mood and suggests a grade direction",
        content:
          "Analyze this documentary scene. The footage is LOG (V-Log/S-Log3). Describe the emotional tone, then suggest: 1) A primary color temperature shift, 2) A highlight/shadow split-tone pairing, 3) A contrast curve shape. Format as DaVinci Resolve node settings.",
      },
      {
        id: "a2",
        type: "preset",
        label: "Doc Warm Base — Node Tree",
        description: "6-node DaVinci tree: CST → Exposure → Contrast → Skin Protect → Look → Film Grain",
        fileName: "doc-warm-base.drx",
      },
      {
        id: "a3",
        type: "lut",
        label: "MC-Doc-Tungsten.cube",
        description: "Custom 3D LUT for tungsten-lit interiors — preserves skin without orange push",
        fileName: "MC-Doc-Tungsten.cube",
      },
      {
        id: "a4",
        type: "template",
        label: "Delivery Checklist",
        description: "Pre-export QC template: levels, gamut, loudness, HDR metadata",
        content:
          "## Delivery QC Checklist\n- [ ] Scopes: No clipping >100 IRE\n- [ ] Gamut: Rec.709 (or P3 for HDR)\n- [ ] Skin tones: 40-50 IRE, vectorscope on skin line\n- [ ] Loudness: -24 LUFS (broadcast) / -14 LUFS (streaming)\n- [ ] Grain: Verify at 100% crop\n- [ ] Export: DNxHR HQX for master, H.265 for delivery",
      },
      {
        id: "a5",
        type: "prompt",
        label: "Client Revision Translator",
        description: "Turns vague client feedback into actionable DaVinci adjustments",
        content:
          "You are a colorist's assistant. A client says: \"{{FEEDBACK}}\". Translate this into specific DaVinci Resolve adjustments. Be precise: name the node, the tool (Lift/Gamma/Gain, Curves, Qualifier), and the direction of the change. If the feedback is ambiguous, list 2-3 interpretations ranked by likelihood.",
      },
    ],
    chapters: [
      { id: "ch1", title: "Why LOG Matters", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ch2", title: "Node Tree Architecture", timestamp: "3:15", timestampSeconds: 195 },
      { id: "ch3", title: "Primary Balance", timestamp: "6:40", timestampSeconds: 400 },
      { id: "ch4", title: "Skin Tone Protection", timestamp: "9:22", timestampSeconds: 562 },
      { id: "ch5", title: "The Look Node", timestamp: "12:50", timestampSeconds: 770 },
      { id: "ch6", title: "AI-Assisted Scene Matching", timestamp: "15:30", timestampSeconds: 930 },
      { id: "ch7", title: "Export & Delivery", timestamp: "17:10", timestampSeconds: 1030 },
    ],
    versions: [
      { version: "2.1", date: "2026-03-20", summary: "Added Claude prompts for scene analysis and client feedback", isCurrent: true },
      { version: "2.0", date: "2026-02-14", summary: "Rebuilt node tree for DaVinci 19; added HDR delivery path", isCurrent: false },
      { version: "1.2", date: "2025-11-30", summary: "Added tungsten LUT and skin protection node", isCurrent: false },
      { version: "1.0", date: "2025-08-12", summary: "Initial release — 4-node grade pipeline for Rec.709", isCurrent: false },
    ],
    publishedAt: "2025-08-12",
    verifiedWins: 3,
  },
  {
    id: "pb_02",
    title: "Short-Form Retention Framework",
    description:
      "The exact pacing, hook, and payoff structure that took my Reels from 42% to 71% average retention.",
    creator: {
      name: "Jordan Kale",
      handle: "@jkale.edit",
      authorityScore: 78,
    },
    category: "Editing & Pacing",
    tags: ["Short-Form", "Retention", "Premiere Pro"],
    thumbnailGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 100%)",
    duration: "11:20",
    version: "1.3",
    remixCount: 1203,
    assets: [
      { id: "a6", type: "prompt", label: "Hook Analyzer", description: "AI prompt to score your first 3 seconds", content: "Score this hook 1-10..." },
      { id: "a7", type: "template", label: "Beat Map Template", description: "Premiere Pro marker template for 30/60/90s formats", content: "## Beat Map\n..." },
      { id: "a8", type: "preset", label: "Snap-Cut Transition Pack", description: "12 Premiere Pro presets for punchy cuts", fileName: "snap-cuts.prfpset" },
    ],
    chapters: [
      { id: "ch8", title: "The 1-Second Rule", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ch9", title: "Beat Mapping", timestamp: "3:00", timestampSeconds: 180 },
      { id: "ch10", title: "The Payoff Stack", timestamp: "7:15", timestampSeconds: 435 },
    ],
    versions: [
      { version: "1.3", date: "2026-03-10", summary: "Added AI hook analyzer prompt", isCurrent: true },
      { version: "1.0", date: "2025-12-01", summary: "Initial pacing framework", isCurrent: false },
    ],
    publishedAt: "2025-12-01",
    verifiedWins: 7,
  },
  {
    id: "pb_03",
    title: "AI-Driven Storyboard Pipeline",
    description:
      "How I use Runway ML + Claude to go from script to animatic in under 2 hours. Full prompt chains included.",
    creator: {
      name: "Suki Tanaka",
      handle: "@sukicuts",
      authorityScore: 85,
    },
    category: "Pre-Production",
    tags: ["AI", "Storyboarding", "Runway ML", "Claude"],
    thumbnailGradient: "linear-gradient(135deg, #0c0c1d 0%, #1a237e 100%)",
    duration: "22:05",
    version: "1.0",
    remixCount: 392,
    assets: [
      { id: "a9", type: "prompt", label: "Script-to-Shot List", description: "Converts screenplay pages into numbered shot descriptions", content: "Break this script page into shots..." },
      { id: "a10", type: "prompt", label: "Shot-to-Image Prompt", description: "Generates Runway ML prompts from shot descriptions", content: "Convert this shot description..." },
      { id: "a11", type: "script", label: "Batch Runner (Python)", description: "Automates Runway API calls for full storyboard generation", content: "import runway\n# batch process..." },
    ],
    chapters: [
      { id: "ch11", title: "The Pipeline Overview", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ch12", title: "Script Decomposition", timestamp: "4:30", timestampSeconds: 270 },
      { id: "ch13", title: "AI Image Generation", timestamp: "11:00", timestampSeconds: 660 },
      { id: "ch14", title: "Assembling the Animatic", timestamp: "17:45", timestampSeconds: 1065 },
    ],
    versions: [
      { version: "1.0", date: "2026-03-05", summary: "Initial release — full pipeline from script to animatic", isCurrent: true },
    ],
    publishedAt: "2026-03-05",
    verifiedWins: 1,
  },
  {
    id: "pb_04",
    title: "Sound Design for Tension & Atmosphere",
    description:
      "Layer-by-layer breakdown of how I build immersive soundscapes for thriller and horror content.",
    creator: {
      name: "Ava Rodriguez",
      handle: "@avaframes",
      authorityScore: 92,
    },
    category: "Sound Design",
    tags: ["Audio", "Sound Design", "Pro Tools", "Atmosphere"],
    thumbnailGradient: "linear-gradient(135deg, #1f1c2c 0%, #302b63 100%)",
    duration: "15:38",
    version: "1.1",
    remixCount: 561,
    assets: [
      { id: "a12", type: "template", label: "Session Template (Pro Tools)", description: "Pre-routed 24-track template with bus structure for tension layers", content: "## Track Layout\n..." },
      { id: "a13", type: "prompt", label: "Foley Layer Suggestor", description: "Describes the scene, AI suggests specific foley elements and their emotional function", content: "Given this scene description..." },
      { id: "a14", type: "preset", label: "Sub-Bass Rumble Chain", description: "EQ + Compression + Saturation chain for low-end tension", fileName: "sub-rumble.ptx" },
    ],
    chapters: [
      { id: "ch15", title: "Anatomy of Tension", timestamp: "0:00", timestampSeconds: 0 },
      { id: "ch16", title: "The 4-Layer Stack", timestamp: "3:45", timestampSeconds: 225 },
      { id: "ch17", title: "Sub-Bass & LFE", timestamp: "8:20", timestampSeconds: 500 },
      { id: "ch18", title: "Final Mix & Delivery", timestamp: "12:55", timestampSeconds: 775 },
    ],
    versions: [
      { version: "1.1", date: "2026-02-28", summary: "Added AI foley suggestor and updated bus routing", isCurrent: true },
      { version: "1.0", date: "2025-10-15", summary: "Initial sound design framework", isCurrent: false },
    ],
    publishedAt: "2025-10-15",
  },
];

export const featuredPlaybook = mockPlaybooks[0];
