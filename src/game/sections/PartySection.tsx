import React, { useState } from "react";
import { party, type PartyMember } from "@/data";

export const PartySection: React.FC = () => {
  const [selected, setSelected] = useState<PartyMember | null>(null);

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">⚔️</span>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "14px",
            color: "var(--rpg-gold)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          PARTY
        </div>
        <div
          className="ml-auto"
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "7px",
            color: "var(--rpg-text-dim)",
          }}
        >
          {party.length} MEMBERS
        </div>
      </div>

      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Party List */}
        <div className="flex-1 space-y-2">
          {party.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelected(member)}
              className="w-full text-left p-3 transition-all duration-100"
              style={{
                background:
                  selected?.id === member.id
                    ? "rgba(233, 69, 96, 0.2)"
                    : "rgba(255,255,255,0.03)",
                border: `2px solid ${
                  selected?.id === member.id ? "var(--rpg-accent)" : "rgba(255,255,255,0.08)"
                }`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl"
                  style={{
                    background: member.color + "33",
                    border: `2px solid ${member.color}`,
                  }}
                >
                  {member.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: "9px",
                        color: "var(--rpg-text)",
                      }}
                    >
                      {member.name}
                    </span>
                    <span
                      className="px-1"
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: "6px",
                        color: member.color,
                        background: member.color + "22",
                        border: `1px solid ${member.color}66`,
                      }}
                    >
                      {member.type}
                    </span>
                  </div>
                  {/* Level bar */}
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: "6px",
                        color: "var(--rpg-text-dim)",
                      }}
                    >
                      LV
                    </span>
                    <div className="flex-1 h-[6px] bg-black/30 relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${member.level}%`,
                          background: `linear-gradient(90deg, ${member.color}, ${member.color}cc)`,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--rpg-font)",
                        fontSize: "6px",
                        color: "var(--rpg-green)",
                      }}
                    >
                      {member.level}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            className="flex-1 p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "2px solid rgba(233, 69, 96, 0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 flex items-center justify-center text-2xl"
                style={{
                  background: selected.color + "33",
                  border: `3px solid ${selected.color}`,
                }}
              >
                {selected.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "12px",
                    color: "var(--rpg-text)",
                  }}
                >
                  {selected.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "7px",
                    color: selected.color,
                  }}
                >
                  {selected.type} TYPE · LV {selected.level}
                </div>
              </div>
            </div>

            <div
              className="mb-3 p-2"
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "7px",
                color: "var(--rpg-text)",
                lineHeight: "1.8",
                background: "rgba(0,0,0,0.2)",
                borderLeft: `3px solid ${selected.color}`,
              }}
            >
              {selected.description}
            </div>

            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "7px",
                color: "var(--rpg-accent)",
                marginBottom: "4px",
              }}
            >
              TECHNIQUES
            </div>
            <div className="flex flex-wrap gap-1">
              {selected.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
