export interface PartyMember {
  id: string;
  name: string;
  type: string;
  level: number;
  color: string;
  icon: string;
  description: string;
  technologies: string[];
}

export const party: PartyMember[] = [
  {
    id: "programming",
    name: "Programming",
    type: "NORMAL",
    level: 85,
    color: "#5B8C5A",
    icon: "⚔️",
    description: "Core programming mastery across multiple paradigms.",
    technologies: ["TypeScript", "Python", "Rust", "C++", "Go"],
  },
  {
    id: "gamedev",
    name: "Game Dev",
    type: "FIRE",
    level: 78,
    color: "#C04040",
    icon: "🎮",
    description: "Creating interactive experiences and game worlds.",
    technologies: ["Unity", "Godot", "Unreal", "Phaser", "Custom Engines"],
  },
  {
    id: "ai",
    name: "AI",
    type: "PSYCHIC",
    level: 72,
    color: "#7B4DA0",
    icon: "🧠",
    description: "Building intelligent systems and neural networks.",
    technologies: ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "ML"],
  },
  {
    id: "3d",
    name: "3D",
    type: "ROCK",
    level: 65,
    color: "#8B7355",
    icon: "🧊",
    description: "3D modeling, rendering, and spatial design.",
    technologies: ["Blender", "Three.js", "WebGL", "Shaders", "Procedural"],
  },
  {
    id: "web",
    name: "Web",
    type: "WATER",
    level: 80,
    color: "#4A7DB5",
    icon: "🌐",
    description: "Full-stack web development and modern frameworks.",
    technologies: ["React", "Next.js", "Node.js", "Convex", "Tailwind"],
  },
  {
    id: "automation",
    name: "Automation",
    type: "ELECTRIC",
    level: 70,
    color: "#D4A017",
    icon: "⚡",
    description: "Automating workflows and building productivity tools.",
    technologies: ["Bots", "Scripts", "CI/CD", "APIs", "Agents"],
  },
];
