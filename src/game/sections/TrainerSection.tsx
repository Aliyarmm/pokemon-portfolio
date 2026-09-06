import React from "react";
import { trainer } from "@/data";

const StatBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({
  label, value, max, color,
}) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
    <div className="hp-bar">
      <div className="hp-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  </div>
);

export const TrainerSection: React.FC = () => (
  <div className="h-full overflow-y-auto rpg-scroll p-4 md:p-6">
    <div className="max-w-3xl mx-auto space-y-4">
      {/* top card */}
      <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
        <div className="portrait-box p-3" style={{ animation: "trainerIdle 3s ease-in-out infinite" }}>
          <img
            src="/assets/trainer-cutout.png"
            alt=""
            aria-hidden
            draggable={false}
            className="block object-cover object-top"
            style={{ width: 84, height: 96 }}
          />
        </div>

        <div className="space-y-3">
          <div>
            <div className="panel-title" style={{ fontSize: "clamp(13px, 3vw, 18px)" }}>
              {trainer.name}
            </div>
            <div className="stat-label" style={{ color: "var(--rpg-red)", marginTop: 4 }}>
              CLASS: {trainer.class} · LV {trainer.stats.level}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { l: "ATK", v: 82, c: "var(--rpg-red)" },
              { l: "DEF", v: 74, c: "var(--rpg-blue)" },
              { l: "SPD", v: 88, c: "var(--rpg-gold)" },
              { l: "INT", v: 91, c: "var(--rpg-purple)" },
            ].map((s) => (
              <StatBar key={s.l} label={s.l} value={s.v} max={100} color={s.c} />
            ))}
          </div>
        </div>
      </div>

      <div className="panel-sep" />

      {/* specialty + interests */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="section-heading">SPECIALTY</div>
          <div className="flex flex-wrap gap-1.5">
            {trainer.specialty.map((s) => (
              <span key={s} className="type-chip" style={{ borderColor: "var(--rpg-green)", color: "#2e7d32" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="section-heading">INTERESTS</div>
          <div className="flex flex-wrap gap-1.5">
            {trainer.interests.map((s) => (
              <span key={s} className="type-chip" style={{ borderColor: "var(--rpg-purple)", color: "#7e57c2" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* current quest */}
      <div>
        <div className="section-heading">CURRENT QUEST</div>
        <div className="info-box" style={{ borderColor: "var(--rpg-gold)" }}>
          {trainer.currentQuest}
        </div>
      </div>

      {/* fun stats */}
      <div>
        <div className="section-heading">FUN STATS</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "☕", label: "COFFEE", value: trainer.stats.coffee },
            { icon: "🐛", label: "BUGS", value: trainer.stats.bugs },
            { icon: "😴", label: "SLEEP", value: String(trainer.stats.sleep) },
          ].map((s) => (
            <div key={s.label} className="info-box text-center py-3">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
