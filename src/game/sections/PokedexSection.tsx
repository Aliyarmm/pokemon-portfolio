import React, { useState } from "react";
import { projects, type Project } from "@/data";

export const PokedexSection: React.FC = () => {
  const [selected, setSelected] = useState<Project>(projects[0]);
  const seen = projects.filter((p) => p.status !== "secret").length;

  return (
    <div className="h-full overflow-y-auto rpg-scroll p-3 md:p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[280px_1fr] gap-4">
        {/* list */}
        <div className="space-y-2 md:max-h-[55vh] md:overflow-y-auto rpg-scroll">
          {projects.map((p) => {
            const sel = selected.id === p.id;
            const isSecret = p.status === "secret";
            return (
              <button
                key={p.id}
                onClick={() => { setSelected(p); sfxHelper("menuMove"); }}
                className="w-full flex items-center gap-2 p-2.5 md:p-3 text-left min-h-[48px]"
                style={{
                  background: sel ? "rgba(233,69,96,0.08)" : "rgba(255,255,255,0.6)",
                  border: `3px solid ${sel ? "var(--rpg-red)" : "#d8d8d8"}`,
                  boxShadow: sel ? "0 0 0 1px var(--rpg-red)" : "none",
                }}
              >
                <span style={{ color: "var(--rpg-red)", fontSize: 10, opacity: sel ? 1 : 0 }}>▶</span>
                <span className="stat-label" style={{ minWidth: 34, color: "#888" }}>{p.number}</span>
                <span
                  style={{
                    fontFamily: "var(--rpg-font)",
                    fontSize: "clamp(8px,2vw,10px)",
                    color: isSecret ? "#999" : "#222",
                  }}
                >
                  {isSecret ? "???" : p.name}
                </span>
                {p.status === "active" && (
                  <span className="ml-auto" style={{ fontSize: 8, color: "var(--rpg-green)" }}>●</span>
                )}
              </button>
            );
          })}
          <div className="pt-1 text-right">
            <span className="stat-label">{seen} SEEN</span>
          </div>
        </div>

        {/* detail */}
        <div className="panel-frame p-4 self-start">
          <div className="flex items-start gap-3 mb-3">
            {/* project "sprite" box */}
            <div
              className="shrink-0 flex items-center justify-center text-3xl"
              style={{
                width: 72, height: 72,
                background: selected.status === "secret" ? "#e0e0e0" : "#FFF8E1",
                border: "3px solid var(--rpg-gold)",
              }}
            >
              {selected.status === "secret" ? "❓" : "📦"}
            </div>
            <div className="min-w-0">
              <div className="stat-label" style={{ color: "#999" }}>{selected.number}</div>
              <div className="panel-title" style={{ fontSize: "clamp(12px,3vw,16px)" }}>{selected.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="type-chip" style={{ borderColor: "var(--rpg-blue)", color: "#1565c0" }}>{selected.type}</span>
                <span
                  className="type-chip"
                  style={{
                    borderColor: selected.status === "active" ? "var(--rpg-green)" : "#9e9e9e",
                    color: selected.status === "active" ? "#2e7d32" : "#757575",
                  }}
                >
                  {selected.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="info-box mb-3">{selected.longDescription}</div>

          <div className="section-heading">TECH</div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selected.technologies.map((t) => (
              <span key={t} className="type-chip" style={{ borderColor: "#9e9e9e", color: "#555" }}>{t}</span>
            ))}
          </div>

          {/* links */}
          <div className="flex flex-wrap gap-2">
            {selected.repo && selected.repo !== "#" && (
              <a href={selected.repo} target="_blank" rel="noopener noreferrer" className="rpg-button">
                REPO →
              </a>
            )}
            {selected.demo && selected.demo !== "#" && (
              <a href={selected.demo} target="_blank" rel="noopener noreferrer" className="rpg-button">
                DEMO →
              </a>
            )}
            {selected.repo === "#" && selected.demo === "#" && (
              <span className="stat-label" style={{ color: "#999" }}>LINKS COMING SOON</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function sfxHelper(name: "menuMove") {
  import("../sfx").then(({ sfx: engine }) => engine.play(name));
}
