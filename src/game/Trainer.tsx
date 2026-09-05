import React, { useState, useCallback, useEffect, useRef } from "react";
import { PixelSprite } from "./PixelSprite";
import { trainerSprite, trainerSpriteB } from "./sprites";
import { sfx } from "./sfx";

interface TrainerProps {
  onHatClick: () => void;
}

export const Trainer: React.FC<TrainerProps> = ({ onHatClick }) => {
  const [frame, setFrame] = useState(0);
  const [excited, setExcited] = useState(false);
  const timerRef = useRef<number | null>(null);

  /* 2-frame idle animation */
  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => (f + 1) % 2), 700);
    return () => window.clearInterval(id);
  }, []);

  const handleHatClick = useCallback(() => {
    onHatClick();
    sfx.play("menuSelect");
    if (excited) return;
    setExcited(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setExcited(false), 1600);
  }, [onHatClick, excited]);

  const sprite = frame === 0 ? trainerSprite : trainerSpriteB;

  return (
    <div
      className="absolute left-1/2 z-[5]"
      style={{ bottom: "17%", transform: "translateX(-50%)" }}
    >
      <div className="relative" style={{ animation: excited ? "trainerHop 0.35s ease-in-out 4" : "none" }}>
        {/* shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{ bottom: -4, width: 56, height: 12, background: "rgba(0,0,0,0.22)" }}
        />

        {/* sprite — clickable region covers whole body, hat is the top 6 rows */}
        <button
          onClick={handleHatClick}
          aria-label="Trainer"
          className="relative block"
          style={{ imageRendering: "pixelated" }}
        >
          <PixelSprite sprite={sprite} scale={5} />
        </button>

        {/* excitement sparkles */}
        {excited && (
          <>
            <div className="absolute -top-3 -left-4 text-sm" style={{ animation: "particleFloat 1.2s ease-out forwards" }}>✨</div>
            <div className="absolute -top-5 right-0 text-sm" style={{ animation: "particleFloat 1.4s ease-out 0.2s forwards" }}>⭐</div>
            <div className="absolute top-2 -right-5 text-sm" style={{ animation: "particleFloat 1.1s ease-out 0.4s forwards" }}>💫</div>
          </>
        )}
      </div>

      {/* name tag */}
      <div
        className="text-center mt-2 select-none"
        style={{
          fontFamily: "var(--rpg-font)",
          fontSize: 7,
          color: "#fff",
          textShadow: "1px 1px 0 rgba(0,0,0,0.7)",
        }}
      >
        ABID
      </div>
    </div>
  );
};
