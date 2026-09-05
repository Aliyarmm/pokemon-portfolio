import React from "react";
import { quests } from "@/data";

export const QuestsSection: React.FC = () => {
  const active = quests.filter((q) => q.status === "active");
  const done = quests.filter((q) => q.status === "completed");
  const locked = quests.filter((q) => q.status === "locked");

  const Group: React.FC<{ title: string; color: string; items: typeof quests; dim?: boolean }> = ({
    title, color, items, dim,
  }) =>
    items.length === 0 ? null : (
      <div className="mb-5">
        <div className="section-heading" style={{ color }}>
          {title}
        </div>
        <div className="space-y-2">
          {items.map((q) => (
            <div
              key={q.id}
              className="p-3"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: `3px solid ${color}66`,
                opacity: dim ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color, fontSize: 9 }}>
                  {q.status === "completed" ? "✓" : q.status === "locked" ? "🔒" : "●"}
                </span>
                <span style={{ fontFamily: "var(--rpg-font)", fontSize: "clamp(8px,2vw,10px)", color: "#222" }}>
                  {q.name}
                </span>
              </div>
              <p className="stat-label mt-2" style={{ color: "#777", lineHeight: 1.8 }}>
                {q.description}
              </p>
              {q.progress !== undefined && q.status === "active" && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="hp-bar flex-1" style={{ height: 7 }}>
                    <div
                      className="hp-fill"
                      style={{ width: `${q.progress}%`, background: "linear-gradient(90deg, #66bb6a, #43a047)" }}
                    />
                  </div>
                  <span className="stat-label" style={{ color: color, fontSize: 6 }}>{q.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="h-full overflow-y-auto rpg-scroll p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Group title="ACTIVE QUESTS" color="#43a047" items={active} />
        <Group title="COMPLETED" color="#5c6bc0" items={done} />
        <Group title="LOCKED" color="#9e9e9e" items={locked} dim />
      </div>
    </div>
  );
};
