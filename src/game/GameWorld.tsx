import React from "react";

interface GameWorldProps {
  timeOfDay: "day" | "evening" | "night";
}

/**
 * World background — hand-drawn RPG field scene (public/assets/scene.png).
 * The scene provides sky, mountains, path, trees and grass. The trainer
 * (Trainer.tsx), Balbosur companion and decorative trees are layered on top.
 */
export const GameWorld: React.FC<GameWorldProps> = ({ timeOfDay }) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0, background: "#87b5d9" }}
    >
      {/* base scene artwork — cover the full viewport on every aspect ratio */}
      <img
        src="/assets/scene.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-bottom select-none"
      />

      {/* field trees — the tall plant cutout, staged at a few depths */}
      <Tree x={"14%"} bottom={"8%"} height={"clamp(90px, 22vh, 220px)"} zIndex={2} />
      <Tree x={"64%"} bottom={"26%"} height={"clamp(40px, 11vh, 110px)"} zIndex={1} />
      <Tree x={"6%"} bottom={"27%"} height={"clamp(34px, 9vh, 90px)"} zIndex={1} />

      {/* atmosphere tint per time of day (subtle, keeps artwork readable) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            timeOfDay === "night"
              ? "linear-gradient(180deg, rgba(10,14,42,0.62) 0%, rgba(16,24,58,0.45) 55%, rgba(20,30,64,0.35) 100%)"
              : timeOfDay === "evening"
              ? "linear-gradient(180deg, rgba(120,60,110,0.30) 0%, rgba(240,150,80,0.16) 60%, rgba(255,190,120,0.12) 100%)"
              : "transparent",
        }}
      />

      {/* stars — night only */}
      {timeOfDay === "night" &&
        STARS.map((s, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: 0.9,
              animation: `twinkle ${2.2 + s.delay}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

      {/* moon — night only */}
      {timeOfDay === "night" && (
        <div
          className="absolute pointer-events-none"
          style={{ top: "7%", right: "12%", animation: "moonGlow 5s ease-in-out infinite" }}
        >
          <svg width="52" height="52" viewBox="0 0 14 14" shapeRendering="crispEdges">
            <rect x="3" y="1" width="8" height="1" fill="#FFF9C4" />
            <rect x="2" y="2" width="10" height="10" fill="#FFF9C4" />
            <rect x="1" y="3" width="12" height="8" fill="#FFF9C4" />
            <rect x="3" y="12" width="8" height="1" fill="#FFF9C4" />
            <rect x="5" y="4" width="2" height="2" fill="#F0EFA5" />
            <rect x="8" y="8" width="3" height="2" fill="#F0EFA5" />
            <rect x="4" y="9" width="2" height="1" fill="#F0EFA5" />
          </svg>
        </div>
      )}
    </div>
  );
};

/* deterministic star field so nothing shifts between renders */
const STARS = Array.from({ length: 36 }, (_, i) => ({
  x: (i * 41 + 13) % 100,
  y: (i * 19 + 5) % 30,
  size: (i % 3) + 1,
  delay: (i % 7) * 0.4,
}));

/**
 * Decorative tree cutout (public/assets/tree.png — the tall plant asset).
 * Rendered at a few depths so the field feels alive on both mobile and desktop.
 */
const Tree: React.FC<{ x: string; bottom: string; height: string; zIndex: number }> = ({
  x, bottom, height, zIndex,
}) => (
  <div
    className="absolute pointer-events-none"
    style={{ left: x, bottom, zIndex, animation: `treeSway ${6 + zIndex}s ease-in-out ${zIndex * 0.8}s infinite`, transformOrigin: "50% 100%" }}
  >
    <img
      src="/assets/tree.png"
      alt=""
      aria-hidden
      draggable={false}
      className="block select-none"
      style={{ height, width: "auto" }}
    />
  </div>
);
