/* ============================================================
   PIXEL SPRITE REGISTRY
   Each sprite is a string grid + palette. '.' = transparent.
   Swap any grid here to replace the art — nothing else changes.
   ============================================================ */

export interface SpriteDef {
  grid: string[];
  palette: Record<string, string>;
}

/* ── TRAINER (16×23) — red cap, blue jacket, idle pose ── */
export const trainerSprite: SpriteDef = {
  palette: {
    c: "#C62828", // cap
    C: "#E53935", // cap light
    h: "#3E2723", // hair
    s: "#F5C89A", // skin
    S: "#E8A86B", // skin shade
    j: "#42A5F5", // jacket
    J: "#1E88E5", // jacket shade
    w: "#FFFFFF", // white
    p: "#37474F", // pants
    P: "#263238", // pants shade
    b: "#5D4037", // boots
    B: "#3E2723", // boots dark
    o: "#F5C89A", // outline-skin
    k: "#212121", // outline/eyes
  },
  grid: [
    ".....cccccc.....",
    "....cCCCCCCc....",
    "...cCCCCCCCc....",
    "..cccccccccc....",
    "..wwwwwwwwww....",
    "..hssssssssh....",
    "..hsskssksssh...",
    "...hsssssssh....",
    "....ssSSss......",
    "...jjjwwjjj.....",
    "..jjjjwwjjjj....",
    "..s jjjjjj s....",
    "..s JJwwJJ s....",
    "....JJwwJJ......",
    "....pppppp......",
    "....pppppp......",
    "....pp..pp......",
    "....pp..pp......",
    "....pp..pp......",
    "....pp..pp......",
    "....bb..bb......",
    "....bb..bb......",
    "...Bbb..bbB.....",
  ],
};

/* Frame B — arm/leg shifted for a subtle idle wobble */
export const trainerSpriteB: SpriteDef = {
  ...trainerSprite,
  grid: [
    ".....cccccc.....",
    "....cCCCCCCc....",
    "...cCCCCCCCc....",
    "..cccccccccc....",
    "..wwwwwwwwww....",
    "..hssssssssh....",
    "..hsskssksssh...",
    "...hsssssssh....",
    "....ssSSss......",
    "...jjjwwjjj.....",
    "..jjjjwwjjjj....",
    ".s jJJJJJJj s...",
    ".s jJwwwwJj s...",
    "....JJwwJJ......",
    "....pppppp......",
    "....pppppp......",
    "...pp....pp.....",
    "...pp....pp.....",
    "...pp....pp.....",
    "..pp......pp....",
    "..bb......bb....",
    "..bb......bb....",
    ".Bbb......bbB...",
  ],
};

/* ── GENERIC CREATURE (16×16) — the "party member" mascot silhouettes ── */
export const creatureSprite: SpriteDef = {
  palette: {
    b: "#2E3A2E", // body dark
    B: "#4A5D4A", // body
    L: "#7B967B", // light
    e: "#FFE082", // eye
    k: "#0D0D0D",
    m: "#D7CCC8", // muzzle
  },
  grid: [
    "..b..........b..",
    "..bb........bb..",
    "..BBb......bBB..",
    "..BBBb....bBBB..",
    "...BBBbbbbBBB...",
    "..BBBBBBBBBBBB..",
    ".BBLLBBBBBBLLBB.",
    ".BLeLkBBBBkLeLB.",
    ".BBLLBBBBBBLLBB.",
    ".BBBBBBmmBBBBBB.",
    "..BBBBmmmmBBBB..",
    "..bBBBmmmmBBBb..",
    "..BBBBBBBBBBBB..",
    "...BBBBBBBBBB...",
    "....BB....BB....",
    "...BBB....BBB...",
  ],
};

/* ── ITEM ICONS (12×12) used in bag/pokedex badges ── */
export const itemIcons: Record<string, SpriteDef> = {
  scroll: {
    palette: { p: "#EDD9A3", P: "#C9AE6B", k: "#6B4F2A" },
    grid: [
    "............",
    ".pppppppppp.",
    ".pPPPPPPPPp.",
    ".pPkkkkkkPp.",
    ".pPPPPPPPPp.",
    ".pPkkkkkPPp.",
    ".pPPPPPPPPp.",
    ".pPkkkkkkPp.",
    ".pPPPPPPPPp.",
    ".pPPPPPPPPPp",
    ".pppppppppp.",
    "............",
    ],
  },
  cap: {
    palette: { c: "#E53935", C: "#C62828", w: "#FFFFFF" },
    grid: [
    "............",
    "....cccc....",
    "..ccCCCCcc..",
    ".cCCCCCCCCc.",
    ".cCwwwwwwCc.",
    "ccccccccccc.",
    ".CCCCCCCCC..",
    "............",
    "............",
    "............",
    "............",
    "............",
    ],
  },
};
