import React, { useState } from "react";
import { bag, type BagItem } from "@/data";
import { sfx } from "../sfx";

export const BagSection: React.FC = () => {
  const [selected, setSelected] = useState<BagItem>(bag[0]);

  return (
    <div className="h-full overflow-y-auto rpg-scroll p-3 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* item grid (classic 2-col bag) */}
        <div className="panel-frame p-3 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bag.map((item) => {
              const sel = selected.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setSelected(item); sfx.play("menuMove"); }}
                  className="flex items-center gap-3 p-2.5 text-left min-h-[56px]"
                  style={{
                    background: sel ? "rgba(233,69,96,0.08)" : "rgba(255,255,255,0.6)",
                    border: `3px solid ${sel ? "var(--rpg-red)" : "#d8d8d8"}`,
                  }}
                >
                  <span style={{ color: "var(--rpg-red)", fontSize: 10, opacity: sel ? 1 : 0 }}>▶</span>
                  <span
                    className="shrink-0 flex items-center justify-center text-lg"
                    style={{ width: 40, height: 40, background: "#FFF8E1", border: "2px solid #d4b106" }}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <div style={{ fontFamily: "var(--rpg-font)", fontSize: "clamp(10px,2.4vw,13px)", color: "#222" }}>
                      {item.name}
                    </div>
                    <div className="stat-label mt-1" style={{ color: "#888" }}>{item.type}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* detail + use */}
        <div className="panel-frame p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{selected.icon}</span>
            <div>
              <div className="panel-title" style={{ fontSize: "clamp(11px,2.5vw,14px)" }}>{selected.name}</div>
              <div className="stat-label mt-1">{selected.description}</div>
            </div>
          </div>
          <a
            href={selected.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rpg-button w-full text-center block min-h-[44px] leading-[44px] text-[9px]"
          >
            USE {selected.name} →
          </a>
        </div>
      </div>
    </div>
  );
};
