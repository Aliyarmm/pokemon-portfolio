import React from "react";
import { quests } from "@/data";

export const QuestsSection: React.FC = () => {
  const activeQuests = quests.filter((q) => q.status === "active");
  const completedQuests = quests.filter((q) => q.status === "completed");
  const lockedQuests = quests.filter((q) => q.status === "locked");

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📜</span>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "14px",
            color: "var(--rpg-gold)",
            textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        >
          QUESTS
        </div>
      </div>

      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      {/* Active Quests */}
      {activeQuests.length > 0 && (
        <div className="mb-4">
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "8px",
              color: "var(--rpg-green)",
            }}
          >
            <span>●</span> ACTIVE QUESTS
          </div>
          <div className="space-y-2">
            {activeQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3"
                style={{
                  background: "rgba(74, 222, 128, 0.05)",
                  border: "2px solid rgba(74, 222, 128, 0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    style={{
                      fontFamily: "var(--rpg-font)",
                      fontSize: "9px",
                      color: "var(--rpg-text)",
                    }}
                  >
                    {quest.name}
                  </span>
                </div>
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                    lineHeight: "1.6",
                  }}
                >
                  {quest.description}
                </div>
                {/* Progress bar */}
                {quest.progress !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[6px] bg-black/30 relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${quest.progress}%`,
                          background: "linear-gradient(90deg, var(--rpg-green), #22c55e)",
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
                      {quest.progress}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <div className="mb-4">
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "8px",
              color: "var(--rpg-blue)",
            }}
          >
            <span>✓</span> COMPLETED
          </div>
          <div className="space-y-2">
            {completedQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3"
                style={{
                  background: "rgba(96, 165, 250, 0.05)",
                  border: "2px solid rgba(96, 165, 250, 0.2)",
                  opacity: 0.7,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "9px",
                    color: "var(--rpg-text)",
                  }}
                >
                  {quest.name}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                    lineHeight: "1.6",
                  }}
                >
                  {quest.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Quests */}
      {lockedQuests.length > 0 && (
        <div>
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "8px",
              color: "var(--rpg-text-dim)",
            }}
          >
            <span>🔒</span> LOCKED
          </div>
          <div className="space-y-2">
            {lockedQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "2px solid rgba(255,255,255,0.06)",
                  opacity: 0.4,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "9px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  {quest.name}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "6px",
                    color: "var(--rpg-text-dim)",
                  }}
                >
                  {quest.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
