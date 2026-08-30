import React, { useState } from "react";
import { bag, type BagItem } from "@/data";

export const BagSection: React.FC = () => {
  const [selected, setSelected] = useState<BagItem | null>(null);

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎒</span>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "14px",
            color: "var(--rpg-gold)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          BAG
        </div>
      </div>

      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      {/* Inventory Grid */}
      <div className="space-y-2 mb-4">
        {bag.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="w-full text-left p-3 transition-all duration-100 flex items-center gap-3"
            style={{
              background:
                selected?.id === item.id
                  ? "rgba(233, 69, 96, 0.2)"
                  : "rgba(255,255,255,0.03)",
              border: `2px solid ${
                selected?.id === item.id ? "var(--rpg-accent)" : "rgba(255,255,255,0.08)"
              }`,
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center text-lg"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "9px",
                  color: "var(--rpg-text)",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "6px",
                  color: "var(--rpg-text-dim)",
                  marginTop: "2px",
                }}
              >
                {item.description}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "6px",
                color: "var(--rpg-text-dim)",
              }}
            >
              {item.type}
            </div>
          </button>
        ))}
      </div>

      {/* Use button */}
      {selected && (
        <div className="text-center">
          <a
            href={selected.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rpg-button inline-block"
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "9px",
            }}
          >
            USE {selected.name} →
          </a>
        </div>
      )}
    </div>
  );
};
