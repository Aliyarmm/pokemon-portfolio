export interface Project {
  id: string;
  number: string;
  name: string;
  type: string;
  status: "active" | "completed" | "archived" | "secret";
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "grimshore",
    number: "#001",
    name: "NINAKK SHESHAM",
    type: "HORROR RPG",
    status: "active",
    description: "A procedurally generated horror RPG with dynamic AI enemies.",
    longDescription:
      "Ninakk Shesham is an atmospheric horror RPG featuring procedurally generated worlds, AI-driven enemy behavior, and a dynamic narrative system. Each playthrough offers unique encounters and environments.",
    technologies: ["Rust", "Custom Engine", "WGPU", "AI"],
    repo: "#",
    demo: "#",
  },
  {
    id: "ai-journal",
    number: "#002",
    name: "AI JOURNAL",
    type: "AI TOOL",
    status: "completed",
    description: "An intelligent journaling app with AI-powered insights.",
    longDescription:
      "AI Journal analyzes your daily entries, identifies patterns, and provides meaningful insights about your thoughts and habits over time.",
    technologies: ["TypeScript", "React", "OpenAI", "Convex"],
    demo: "#",
  },
  {
    id: "trading-system",
    number: "#003",
    name: "TRADING SYS",
    type: "FINTECH",
    status: "completed",
    description: "Algorithmic trading system with backtesting capabilities.",
    longDescription:
      "A sophisticated trading system featuring real-time market analysis, strategy backtesting, and risk management algorithms.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    repo: "#",
  },
  {
    id: "unknown",
    number: "#???",
    name: "???",
    type: "???",
    status: "secret",
    description: "A mysterious project yet to be revealed.",
    longDescription: "This project is still shrouded in mystery. Stay tuned for updates.",
    technologies: ["???"],
  },
];
