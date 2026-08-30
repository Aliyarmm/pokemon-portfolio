export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export const badges: Badge[] = [
  {
    id: "first-game",
    name: "FIRST GAME",
    description: "Published your first game project.",
    icon: "🎮",
    unlocked: true,
    unlockedDate: "2023",
  },
  {
    id: "ai-pioneer",
    name: "AI PIONEER",
    description: "Built your first AI-powered application.",
    icon: "🧠",
    unlocked: true,
    unlockedDate: "2024",
  },
  {
    id: "full-stack",
    name: "FULL STACK",
    description: "Shipped a complete full-stack application.",
    icon: "🌐",
    unlocked: true,
    unlockedDate: "2024",
  },
  {
    id: "open-source",
    name: "OPEN SOURCE",
    description: "Contributed to open source projects.",
    icon: "📦",
    unlocked: true,
    unlockedDate: "2023",
  },
  {
    id: "pixel-master",
    name: "PIXEL MASTER",
    description: "Created original pixel art assets.",
    icon: "🎨",
    unlocked: true,
    unlockedDate: "2024",
  },
  {
    id: "speed-runner",
    name: "SPEED RUNNER",
    description: "Completed a project in record time.",
    icon: "⚡",
    unlocked: false,
  },
  {
    id: "legendary",
    name: "LEGENDARY",
    description: "Achieve something truly extraordinary.",
    icon: "👑",
    unlocked: false,
  },
];
