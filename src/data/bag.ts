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
    id: "instagram",
    name: "INSTAGRAM",
    description: "Follow @_abid.eeey.",
    icon: "📸",
    url: "https://instagram.com/_abid.eeey",
    type: "SOCIAL",
  },
];
