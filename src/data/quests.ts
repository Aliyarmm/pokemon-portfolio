export interface Quest {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "locked";
  progress?: number;
}

export const quests: Quest[] = [
  {
    id: "finish-grimshore",
    name: "Finish Grimshore",
    description: "Complete development of the horror RPG and release v1.0.",
    status: "active",
    progress: 65,
  },
  {
    id: "improve-ai",
    name: "Improve AI System",
    description: "Enhance AI capabilities and add new neural architectures.",
    status: "active",
    progress: 40,
  },
  {
    id: "next-project",
    name: "Start Next Project",
    description: "Begin development on an exciting new creation.",
    status: "active",
    progress: 10,
  },
  {
    id: "first-game-done",
    name: "First Game Released",
    description: "Successfully published the first game project.",
    status: "completed",
  },
  {
    id: "ai-journal-done",
    name: "AI Journal Complete",
    description: "Built and shipped the AI-powered journaling app.",
    status: "completed",
  },
  {
    id: "master-rust",
    name: "Master Rust",
    description: "Achieve expert-level proficiency in Rust programming.",
    status: "locked",
  },
];
