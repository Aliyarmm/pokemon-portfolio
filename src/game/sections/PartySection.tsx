import React, { useState } from "react";
import { party, type PartyMember } from "@/data";
import { PixelSprite } from "../PixelSprite";
import { creatureSprite } from "../sprites";

export const PartySection: React.FC = () => {
  const [selected, setSelected] = useState<PartyMember>(party[0]);

  return (
    <div className="h-full overflow-y-auto rpg-scroll p-3 md:p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr_1fr] gap-4">
        {/* roster */}
        <div className="space-y-2">
          {party.map((m) => {
            const sel = selected.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => { setSelected(m); sfx("menuMove"); }}
                className="w-full flex items-center gap-3 p-2.5 md:p-3 text-left transition-colors min-h-[56px]"
                style={{
                  background: sel ? "rgba(233,69,96,0.08)" : "rgba(255,255,255,0.5)",
                  border: `3px solid ${sel ? "var(--rpg-red)" : "#d8d8d8"}`,
                  boxShadow: sel ? "0 0 0 1px var(--rpg-red), 0 2px 0 rgba(0,0,0,0.1)" : "0 2px 0 rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ color: "var(--rpg-red)", fontSize: 11, opacity: sel ? 1 : 0 }}>▶</span>
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{
                    width: 44, height: 44,
                    background: `${m.color}22`,
                    border: `2px solid ${m.color}`,
                  }}
                >
                  <PixelSprite sprite={creatureSprite} scale={2.4} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span style={{ fontFamily: "var(--rpg-font)", fontSize: "clamp(8px,2vw,10px)" }}>{m.name}</span>
                    <span className="type-chip" style={{ borderColor: m.color, color: m.color, fontSize: 5 }}>{m.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="stat-label" style={{ fontSize: 6 }}>Lv{m.level}</span>
                    <div className="hp-bar flex-1" style={{ height: 7 }}>
                      <div className="hp-fill" style={{ width: `${m.level}%`, background: m.color }} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div className="panel-frame p-4 self-start md:sticky md:top-0">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="shrink-0 flex items-center justify-center"
              style={{ width: 64, height: 64, background: `${selected.color}22`, border: `3px solid ${selected.color}` }}
            >
              <PixelSprite sprite={creatureSprite} scale={3.4} />
            </div>
            <div>
              <div className="panel-title" style={{ fontSize: "clamp(11px,2.5vw,14px)" }}>{selected.name}</div>
              <div className="stat-label" style={{ color: selected.color, marginTop: 4 }}>
                {selected.type} · Lv {selected.level}
              </div>
            </div>
          </div>

          <div className="info-box mb-3">{selected.description}</div>

          <div className="section-heading">TECHNIQUES</div>
          <div className="flex flex-wrap gap-1.5">
            {selected.technologies.map((t) => (
              <span key={t} className="type-chip" style={{ borderColor: "#9e9e9e", color: "#555" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* tiny sfx helper (avoids importing whole module names) */
function sfx(name: "menuMove") {
  import("../sfx").then(({ sfx: engine }) => engine.play(name));
}
