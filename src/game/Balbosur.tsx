import React from "react";

/**
 * Balbosur — the trainer's companion (public/assets/balbosur.gif).
 * Hovers slightly behind and to the right of the trainer with a gentle
 * float. Sits visually "behind" the trainer via a lower z-index and a
 * higher position on the field.
 */
export const Balbosur: React.FC = () => {
  return (
    <div
      className="absolute z-[4] pointer-events-none"
      style={{ right: "6%", bottom: "24%" }}
    >
      <div
        className="relative"
        style={{ animation: "companionFloat 4.2s ease-in-out infinite" }}
      >
        {/* soft shadow beneath */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: -10,
            width: "55%",
            height: 10,
            background: "rgba(0,0,0,0.18)",
            filter: "blur(2px)",
          }}
        />

        <img
          src="/assets/balbosur.gif"
          alt="Balbosur, the trainer's companion"
          draggable={false}
          className="block select-none"
          style={{
            width: "clamp(64px, 13vw, 140px)",
            height: "auto",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))",
          }}
        />
      </div>
    </div>
  );
};
