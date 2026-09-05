import React, { useState } from "react";
import { badges, type Badge } from "@/data";
import { sfx } from "../sfx";

export const BadgesSection: React.FC = () => {
  const [selected, setSelected] = useState<Badge>(badges[0]);
  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <div className="h-full overflow-y-auto rpg-scroll p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="stat-label">
            {unlocked}/{badges.length} EARNED
          </span>
        </div>

        {/* badge case */}
        <div
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 md:gap-4 p-4 mb-5"
          style={{ background: "rgba(255,255,255,0.55)", border: "3px solid #c9a227" }}
        >
          {badges.map((b, i) => {
            const sel = selected.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => { setSelected(b); if (b.unlocked) sfx.play("badgeUnlock"); }}
                className="relative flex items-center justify-center transition-transform hover:scale-110"
                style={{
                  width: "100%", aspectRatio: "1",
                  background: b.unlocked ? "rgba(255,248,225,0.9)" : "#e5e5e5",
                  border: `3px solid ${sel ? "var(--rpg-red)" : b.unlocked ? "#c9a227" : "#bbb"}`,
                  opacity: b.unlocked ? 1 : 0.45,
                  animation: b.unlocked ? `badgeUnlock 0.5s ease-out ${i * 0.08}s both` : "none",
                }}
                aria-label={b.name}
              >
                <span style={{ fontSize: "clamp(20px,5vw,30px)", filter: b.unlocked ? "none" : "grayscale(1)" }}>
                  {b.icon}
                </span>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div className="panel-frame p-4">
          <div className="flex items-center gap-3">
            <div
              className="shrink-0 flex items-center justify-center text-3xl"
              style={{
                width: 64, height: 64,
                background: selected.unlocked ? "rgba(255,248,225,0.95)" : "#e0e0e0",
                border: `3px solid ${selected.unlocked ? "#c9a227" : "#bbb"}`,
                filter: selected.unlocked ? "none" : "grayscale(1)",
              }}
            >
              {selected.icon}
            </div>
            <div className="min-w-0">
              <div className="panel-title" style={{ fontSize: "clamp(11px,2.5vw,14px)" }}>{selected.name}</div>
              <p className="text-[7px] leading-loose mt-2" style={{ fontFamily: "var(--rpg-font)", color: "#555" }}>
                {selected.description}
              </p>
              <div className="mt-2">
                {selected.unlocked ? (
                  <span className="type-chip" style={{ borderColor: "var(--rpg-green)", color: "#2e7d32" }}>
                    ✓ UNLOCKED {selected.unlockedDate ?? ""}
                  </span>
                ) : (
                  <span className="type-chip" style={{ borderColor: "#999", color: "#777" }}>
                    🔒 LOCKED
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
