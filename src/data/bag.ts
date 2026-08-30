export interface BagItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  type: string;
}

export const bag: BagItem[] = [
  {
    id: "resume",
    name: "RESUME",
    description: "View or download my resume.",
    icon: "📄",
    url: "#",
    type: "DOCUMENT",
  },
  {
    id: "github",
    name: "GITHUB",
    description: "Check out my repositories.",
    icon: "🐙",
    url: "https://github.com",
    type: "LINK",
  },
  {
    id: "email",
    name: "EMAIL",
    description: "Send me a message.",
    icon: "📧",
    url: "mailto:hello@example.com",
    type: "CONTACT",
  },
  {
    id: "linkedin",
    name: "LINKEDIN",
    description: "Connect on LinkedIn.",
    icon: "💼",
    url: "https://linkedin.com",
    type: "SOCIAL",
  },
  {
    id: "website",
    name: "WEBSITE",
    description: "Visit my personal website.",
    icon: "🌍",
    url: "#",
    type: "LINK",
  },
];
