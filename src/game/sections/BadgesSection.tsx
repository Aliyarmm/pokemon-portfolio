import React, { useState } from "react";
import { badges, type Badge } from "@/data";

export const BadgesSection: React.FC = () => {
  const [selected, setSelected] = useState<Badge | null>(null);

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🏆</span>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "14px",
            color: "var(--rpg-gold)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          BADGES
        </div>
        <div
          className="ml-auto"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "7px",
            color: "var(--rpg-text-dim)",
          }}
        >
          {badges.filter((b) => b.unlocked).length}/{badges.length} OBTAINED
        </div>
      </div>

      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      {/* Badge Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {badges.map((badge) => (
          <button
            key={badge.id}
            onClick={() => setSelected(badge)}
            className="p-3 text-center transition-all duration-200"
            style={{
              background: badge.unlocked
                ? "rgba(251, 191, 36, 0.1)"
                : "rgba(255,255,255,0.02)",
              border: `2px solid ${
                selected?.id === badge.id
                  ? "var(--rpg-gold)"
                  : badge.unlocked
                  ? "rgba(251, 191, 36, 0.3)"
                  : "rgba(255,255,255,0.08)"
              }`,
              opacity: badge.unlocked ? 1 : 0.4,
            }}
          >
            <div
              className="text-2xl mb-1"
              style={{
                filter: badge.unlocked ? "none" : "grayscale(100%)",
              }}
            >
              {badge.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "6px",
                color: badge.unlocked ? "var(--rpg-gold)" : "var(--rpg-text-dim)",
              }}
            >
              {badge.name}
            </div>
          </button>
        ))}
      </div>

      {/* Badge Detail */}
      {selected && (
        <div
          className="p-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `2px solid ${selected.unlocked ? "rgba(251, 191, 36, 0.4)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl"
              style={{
                background: selected.unlocked
                  ? "rgba(251, 191, 36, 0.15)"
                  : "rgba(255,255,255,0.05)",
                border: `2px solid ${selected.unlocked ? "var(--rpg-gold)" : "rgba(255,255,255,0.1)"}`,
                filter: selected.unlocked ? "none" : "grayscale(100%)",
              }}
            >
              {selected.icon}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "10px",
                  color: selected.unlocked ? "var(--rpg-gold)" : "var(--rpg-text-dim)",
                }}
              >
                {selected.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "7px",
                  color: "var(--rpg-text)",
                  lineHeight: "1.6",
                  marginTop: "4px",
                }}
              >
                {selected.description}
              </div>
              {selected.unlocked && selected.unlockedDate && (
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-green)",
                  }}
                >
                  ✓ UNLOCKED {selected.unlockedDate}
                </div>
              )}
              {!selected.unlocked && (
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  🔒 LOCKED
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
