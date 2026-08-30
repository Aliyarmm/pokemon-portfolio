import React from "react";
import { trainer } from "@/data";

export const TrainerSection: React.FC = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto rpg-scroll">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-16 h-16 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #E53935, #C62828)",
            border: "3px solid var(--rpg-gold)",
          }}
        >
          <span className="text-2xl">🧑‍💻</span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "16px",
              color: "var(--rpg-gold)",
              textShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
            }}
          >
            TRAINER CARD
          </div>
          <div
            style={{
              fontFamily: "var(--rpg-font)",
              fontSize: "8px",
              color: "var(--rpg-accent)",
            }}
          >
            ★ RANK: CREATOR ★
          </div>
        </div>
      </div>

      {/* Separator */}
      <div
        className="mb-4"
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--rpg-accent), var(--rpg-gold), var(--rpg-accent))",
        }}
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "NAME", value: trainer.name },
          { label: "CLASS", value: trainer.class },
          { label: "LEVEL", value: String(trainer.stats.level) },
          { label: "COMMITS", value: trainer.stats.commits },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(233, 69, 96, 0.3)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "6px",
                color: "var(--rpg-text-dim)",
                marginBottom: "2px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "9px",
                color: "var(--rpg-text)",
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Specialty */}
      <div className="mb-4">
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "8px",
            color: "var(--rpg-accent)",
            marginBottom: "6px",
          }}
        >
          SPECIALTY
        </div>
        <div className="flex flex-wrap gap-2">
          {trainer.specialty.map((s) => (
            <span
              key={s}
              className="px-2 py-1"
              style={{
                fontFamily: "var(--rpg-font)",
                fontSize: "7px",
                color: "var(--rpg-text)",
                background: "rgba(74, 222, 128, 0.15)",
                border: "1px solid var(--rpg-green)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Current Quest */}
      <div className="mb-4">
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "8px",
            color: "var(--rpg-accent)",
            marginBottom: "6px",
          }}
        >
          CURRENT QUEST
        </div>
        <div
          className="p-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "2px solid rgba(251, 191, 36, 0.3)",
            fontFamily: "var(--rpg-font)",
            fontSize: "8px",
            color: "var(--rpg-gold)",
            lineHeight: "1.8",
          }}
        >
          {trainer.currentQuest}
        </div>
      </div>

      {/* Fun Stats */}
      <div>
        <div
          style={{
            fontFamily: "var(--rpg-font)",
            fontSize: "8px",
            color: "var(--rpg-accent)",
            marginBottom: "6px",
          }}
        >
          FUN STATS
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "COFFEE", value: trainer.stats.coffee, icon: "☕" },
            { label: "BUGS", value: trainer.stats.bugs, icon: "🐛" },
            { label: "SLEEP", value: String(trainer.stats.sleep), icon: "😴" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-2 text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-lg mb-1">{stat.icon}</div>
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "6px",
                  color: "var(--rpg-text-dim)",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--rpg-font)",
                  fontSize: "8px",
                  color: "var(--rpg-text)",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
